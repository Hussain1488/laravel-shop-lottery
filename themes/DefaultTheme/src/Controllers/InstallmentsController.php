<?php

namespace Themes\DefaultTheme\src\Controllers;

use App\Models\installmentdetails;
use App\Models\Makeinstallmentsm;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\OrderPaid;
use App\Events\WalletAmountIncreased;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\buyertransaction;
use App\Models\createstore;
use App\Models\Gateway;
use App\Models\Transaction;
use App\Models\User as ModelsUser;
use App\Models\WalletHistory;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Morilog\Jalali\Jalalian;
use Shetabit\Payment\Facade\Payment;
use Shetabit\Multipay\Invoice;

class InstallmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //  going to installments records of user
    public function index()
    {

        // $jalaliNow = Jalalian::now();
        // dd($jalaliNow->format('Y/m/d'));
        $installmentsm = Makeinstallmentsm::where('userselected', Auth::user()->id)->with('installments', 'store', 'user')->get();

        // dd($installmentsm);
        $user = Auth::user();


        // dd($installmentsm);


        return view('front::user.installments.index', compact('installmentsm', 'user'));
    }

    // paying the prepayment and creating the installments according its number.
    public function userStatus($id)
    {
        $installments = Makeinstallmentsm::find($id);
        $user = User::find(Auth::user()->id);

        $bank = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط قسط ها');
        })->first();
        // dd($bank);
        if ($bank) {
            // dd('ehy');
            $bank_id = $bank->id;
        } else {
            return redirect()->back()->with('warning', 'درخواست شماب با مشکل مواجه شده است،‌لطفا با مرکز تماس بگیرید!');
        }

        // dd($user->inventory, $installments->prepaidamount, $user->purchasecredit, $installments->prepaidamount);

        // dd('this is ');
        if ($user->inventory >= $installments->prepaidamount && $user->purchasecredit >= $installments->prepaidamount) {

            $user->inventory -= $installments->prepaidamount;
            $user->purchasecredit -= $installments->Creditamount;

            $Insta_dateils = new installmentdetails();

            $jalali_date_now = Jalalian::now();
            // $new_date = $jalali_date_now->addMonths(1)->format('Y-m-d');
            if ($installments->numberofinstallments > 0) {
                for ($i = 0; $i < $installments->numberofinstallments; $i++) {
                    $dutedate = $jalali_date_now->addMonths($i + 1)->format('Y-m-d');
                    $Insta_dateils->create([
                        'installment_id' => $installments->id,
                        'installmentnumber' => $i + 1,
                        'installmentprice' => $installments->amounteachinstallment,
                        'paymentstatus' => 0,
                        'duedate' => $dutedate,
                    ]);
                }
                $message = 'پیش پرداخت شما با موفقیت پرداخت شده و اقساط شما ایجاد شد.';
            } else {
                $message = 'پرداخت شما با موفقیت انجام شد.';
            }

            $buyer_trans1 = buyertransaction::transaction(Auth::user(), $installments->prepaidamount, false, 1, 1);

            $buyer_trans = buyertransaction::transaction(Auth::user(), $installments->Creditamount, false, 0, 1);

            $bank = banktransaction::transaction($bank_id, $installments->prepaidamount, true, $buyer_trans1->id);

            $user->save();
            $installments->statususer = 1;
            $jalaliNow = Jalalian::now()->format('Y-m-d');
            $installments->datepayment = $jalaliNow;
            $installments->save();
            // dd($user->inventory, $installments->prepaidamount);

            return redirect()->back()->with('success', $message);
        } else {
            // dd('if');
            return redirect()->back()->with('warning', 'موجودی شما کمتر از مقدار پیش پرداخت است و یا اعتبار شما کمتر از مقدار خرید است، لطفا کیف پول خود را شارژ نموده دوباره تلاش کنید.');
        }
    }

    //  Paying specific installments and creating its bank transaction.
    public function paymentStatus($id, $st)
    {

        $bank = new banktransaction();

        $recordCount = banktransaction::count();

        $bank = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط قسط ها');
        })->first();
        if ($bank) {
            $bank_id = $bank->id;
        } else {
            redirect()->back()->with('warning', 'درخواست شماب با مشکل مواجه شده است،‌لطفا با مرکز تماس بگیرید!');
        }
        // dd($id, $st);
        $installments = Makeinstallmentsm::find($st);
        $insta_dateils = installmentdetails::find($id);
        $insta_dateils->paymentstatus = 1;
        $installments->paymentstatus = 1;

        $user = User::find($installments->userselected);
        $user->inventory -= $insta_dateils->installmentprice;


        // transaction($user, $amount, $status, $flag)
        $buyer_trans = buyertransaction::transaction(Auth::user(), $insta_dateils->installmentprice, false, 1, 0);

        $bank = banktransaction::transaction($bank_id, $installments->Creditamount, true, $buyer_trans->id);
        // if ($recordCount > 0) {
        //     $lastRecord = banktransaction::latest()->first();
        //     $bank = new banktransaction();
        //     $bank->create([
        //         'bank_id' => $b->id,
        //         'bankbalance' => $lastRecord->bankbalance + $insta_dateils->installmentprice,
        //         'transactionprice' => $insta_dateils->installmentprice,
        //         'transactionsdate' => Jalalian::now()->format('Y-m-d'),
        //     ]);
        // } else {
        //     $bank = new banktransaction();
        //     $bank->create([
        //         'bank_id' => $b->id,
        //         'bankbalance' => +$insta_dateils->installmentprice,
        //         'transactionprice' => $insta_dateils->installmentprice,
        //         'transactionsdate' => Jalalian::now()->format('Y-m-d'),
        //     ]);
        // }

        // $bank = banktransaction::transaction($b->id, $installments->Creditamount, true, $buyer_trans->id);



        // $trans = banktransaction::where('bank_id', $bank_id->id)->latest()->get();
        // if ($trans->count()  > 0) {
        //     $exBalance = $trans->first()->bankbalance + $insta_dateils->installmentprice;
        // } else {
        //     $exBalance = +$insta_dateils->installmentprice;
        // }
        // // $bank_id = createbankaccounts::where();
        // $banktransaction = banktransaction::create([
        //     'bank_id' => $bank_id->id,
        //     'transactionprice' => $insta_dateils->installmentprice,
        //     'bankbalance' => $exBalance,
        //     'transactionsdate' => Jalalian::now()->format('Y-m-d'),
        // ]);


        $user->save();
        $insta_dateils->save();
        $installments->save();

        return redirect()->back();
    }


    // Destroying specific installments
    public function refuse($id)
    {
        $refuse = Makeinstallmentsm::find($id);
        $store = createstore::find($refuse->store_id);
        $user = User::find($refuse->userselected);
        $store->storecredit += $refuse->Creditamount;
        $user->purchasecredit += $refuse->Creditamount;
        // dd($refuse->Creditamount, $user->purchasecredit);

        $user->save();
        $store->save();
        $refuse->delete();
        return redirect()->back();
    }
    public function pay()
    {
        dd('this is pay');
    }
}
