<?php

namespace Themes\DefaultTheme\src\Controllers;

use App\Events\OrderPaid;
use App\Events\WalletAmountIncreased;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\buyertransaction;
use App\Models\Gateway;
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
    public function recharge(Request $request)
    {
        // buyer Transaction Creating
        $user_transaction_number = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', $request->user_id)->count();
        if ($user_transaction_number > 0) {
            $doc_number = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', $request->user_id)->latest()->first()->documentnumber + 1;
            $final_price = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', $request->user_id)->latest()->first()->finalprice - $request->recharge_amount;
        } else {
            $doc_number = 10000;
            $final_price = -$request->recharge_amount;
        }

        $user_trans = buyertransaction::create([
            'user_id' => $request->user_id,
            'flag' => 1,
            'datetransaction' => Jalalian::now(),
            'typeoftransaction' => 1,
            'price' => $request->recharge_amount,
            'finalprice' => $final_price,
            'documentnumber' => $doc_number
        ]);


        // creating banktransaction
        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'بانک');
        })->first();

        $trans = banktransaction::where('bank_id', $bank_id->id)->latest()->get();
        if ($trans->count()  > 0) {
            $exBalance = $trans->first()->bankbalance - $request->recharge_amount;
        } else {
            $exBalance = -$request->recharge_amount;
        }
        // $bank_id = createbankaccounts::where();
        $banktransaction = banktransaction::create([
            'bank_id' => $bank_id->id,
            'transactionprice' => $request->recharge_amount,
            'bankbalance' => $exBalance,
            'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            'buyer_trans_id' => $user_trans->id
        ]);


        // dd($request->all());
        $user = User::find($request->user_id);
        $user->inventory += $request->recharge_amount;
        $user->save();
        return redirect()->back()->with('success', 'شارژ کیف پول برای شما با موفقیت انجام شد!');
    }
}
