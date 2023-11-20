<?php

namespace Themes\DefaultTheme\src\Controllers;

use App\Events\OrderPaid;
use App\Events\WalletAmountIncreased;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\buyertransaction;
use App\Models\Gateway;
use App\Models\OneTimeCode;
use App\Models\Sms;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\WalletHistory;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Morilog\Jalali\Jalalian;
use Shetabit\Payment\Facade\Payment;
use Shetabit\Multipay\Invoice;
use Illuminate\Validation\Rule;

class WalletController extends Controller
{
    public function index()
    {
        $trans = buyertransaction::where('flag', 1)->latest()->get();
        $user = User::find(Auth::user()->id);

        return view('front::user.wallet.index', compact('trans', 'user'));
    }

    public function show(WalletHistory $wallet)
    {
        return view('front::user.wallet.show')->with('history', $wallet);
    }

    public function create()
    {
        $gateways = Gateway::active()->get();

        return view('front::user.wallet.create', compact('gateways'));
    }

    public function store(Request $request)
    {
        $gateways = Gateway::active()->pluck('key')->toArray();

        $request->validate([
            'amount'      => 'required|numeric|max:500000000|min:1000',
            'gateway'     => 'required|in:' . implode(',', $gateways),
        ]);

        $gateway = $request->gateway;
        $amount  = intval($request->amount);
        $wallet  = auth()->user()->getWallet();

        $history = $wallet->histories()->create([
            'type'        => 'deposit',
            'amount'      => $amount,
            'description' =>  trans('front::messages.controller.wallet-recharge'),
            'source'      => 'user',
            'status'      => 'fail'
        ]);

        try {

            $gateway_configs = get_gateway_configs($gateway);

            return Payment::via($gateway)->config($gateway_configs)->callbackUrl(route('front.wallet.verify', ['gateway' => $gateway]))->purchase(
                (new Invoice)->amount($amount),
                function ($driver, $transactionId) use ($history, $gateway, $amount) {
                    DB::table('transactions')->insert([
                        'status'               => false,
                        'amount'               => $amount,
                        'factorNumber'         => $history->id,
                        'mobile'               => auth()->user()->username,
                        'message'              => trans('front::messages.controller.created-for-gateway') . $gateway,
                        'transID'              => $transactionId,
                        'token'                => $transactionId,
                        'user_id'              => auth()->user()->id,
                        'transactionable_type' => WalletHistory::class,
                        'transactionable_id'   => $history->id,
                        'gateway_id'           => Gateway::where('key', $gateway)->first()->id,
                        "created_at"           => Carbon::now(),
                        "updated_at"           => Carbon::now(),
                    ]);

                    session()->put('transactionId', $transactionId);
                    session()->put('amount', $amount);
                }
            )->pay()->render();
        } catch (Exception $e) {
            return redirect()->route('front.wallet.index', ['history' => $history])->with('transaction-error', $e->getMessage());
        }
    }

    public function verify($gateway)
    {
        $transactionId = session()->get('transactionId');
        $amount        = session()->get('amount');

        $transaction = Transaction::where('status', false)->where('transID', $transactionId)->firstOrFail();

        $history = $transaction->transactionable;

        $gateway_configs = get_gateway_configs($gateway);

        try {
            $receipt = Payment::via($gateway)->config($gateway_configs);

            if ($amount) {
                $receipt = $receipt->amount(intval($amount));
            }

            $receipt = $receipt->transactionId($transactionId)->verify();

            DB::table('transactions')->where('transID', $transactionId)->update([
                'status'               => 1,
                'traceNumber'          => $receipt->getReferenceId(),
                'message'              => $transaction->message . '<br>' . trans('front::messages.controller.successful-gateway') . $gateway,
                'updated_at'           => Carbon::now(),
            ]);

            $history->update([
                'status' => 'success',
            ]);

            event(new WalletAmountIncreased($history->wallet));

            $history->wallet->refereshBalance();

            if ($history->order) {
                $result = $history->order->payUsingWallet();

                if ($result) {
                    $history->order->update([
                        'status' => 'paid',
                    ]);

                    event(new OrderPaid($history->order));

                    return redirect()->route('front.orders.show', ['order' => $history->order])->with('message', 'ok');
                }
            }

            return redirect()->route('front.wallet.index', ['history' => $history])->with('message', 'ok');
        } catch (\Exception $exception) {

            DB::table('transactions')->where('transID', $transactionId)->update([
                'message'              => $transaction->message . '<br>' . $exception->getMessage(),
                "updated_at"           => Carbon::now(),
            ]);

            if ($history->order) {
                return redirect()->route('front.orders.show', ['order' => $history->order])
                    ->with('transaction-error', $exception->getMessage())
                    ->with('order_id', $history->order->id);
            }

            return redirect()->route('front.wallet.index', ['history' => $history])->with('transaction-error', $exception->getMessage());
        }
    }

    public function codeGenerate()
    {
        $sms = oneTimeCode(Auth::user(), Sms::TYPES['VERIFY_CODE']);
        varifySms($sms, Auth::user());
        return response('success');
    }
    public function sendCode(Request $request)
    {

        $user = Auth::user();

        $code = OneTimeCode::where('user_id', $user->id)
            ->where('code', $request->verify_code)
            ->first();

        if ($code) {
            return response('success');
        } else {
            return response()->json(['data' => 'کد وارد شده اشتباه است لطفا کد درست را وارد کنید.'], 422);
        }
    }

    public function rechargeVarify(Request $request)
    {

        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'بانک');
        })->first();
        if (!$bank_id) {
            return redirect()->back()->with('warning', 'خطای سرور. لطفا به مرکز اطلاع بدهید.');
        }



        $user = User::find($request->user_id);
        $user_trans = buyertransaction::transaction($user, $request->recharge_amount, false, 1, 1);

        banktransaction::transaction($bank_id->id, $request->recharge_amount, false, $user_trans->id, 'user');

        $user = User::find($request->user_id);
        $user->inventory += $request->recharge_amount;
        $user->save();
        return redirect()->back()->with('success', 'شارژ کیف پول برای شما با موفقیت انجام شد!');
    }
}
