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

        // dd('this is ');
        if ($user->inventory >= $installments->prepaidamount || $user->purchasecredit >= $installments->prepaidamount) {

            $user->inventory -= $installments->prepaidamount;
            $user->purchasecredit -= $installments->Creditamount;

            $Insta_dateils = new installmentdetails();

            $jalali_date_now = Jalalian::now();
            // $new_date = $jalali_date_now->addMonths(1)->format('Y-m-d');
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

            $user_transaction_number = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->count();
            if ($user_transaction_number > 0) {
                $doc_number = buyertransaction::latest()->first()->documentnumber + 1;
                if (buyertransaction::where('flag', 0)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->count() > 0) {
                    $final_price = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->latest()->first()->finalprice - $installments->prepaidamount;
                } else {
                    $final_price = -$installments->prepaidamount;
                }
            } else {
                $doc_number = 10000;
                $final_price = -$installments->prepaidamount;
            }

            $user_trans = buyertransaction::create([
                'user_id' => Auth::user()->id,
                'flag' => 1,
                'datetransaction' => Jalalian::now(),
                'typeoftransaction' => 1,
                'price' => $installments->prepaidamount,
                'finalprice' => $final_price,
                'documentnumber' => $doc_number
            ]);

            $user_transaction_number1 = buyertransaction::count();
            if ($user_transaction_number1 > 0) {
                $doc_number = buyertransaction::latest()->first()->documentnumber + 1;
                if (buyertransaction::where('flag', 0)->where('user_id', Auth::user()->id)->count() > 0) {
                    $final_price = buyertransaction::where('flag', 0)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->latest()->first()->finalprice - $installments->Creditamount;
                } else {
                    $final_price = -$installments->Creditamount;
                }
            } else {
                $doc_number = 10000;
                $final_price = -$installments->Creditamount;
            }

            $user_trans1 = buyertransaction::create([
                'user_id' => Auth::user()->id,
                'flag' => 0,
                'datetransaction' => Jalalian::now(),
                'typeoftransaction' => 1,
                'price' => $installments->Creditamount,
                'finalprice' => $final_price,
                'documentnumber' => $doc_number
            ]);

            $bank_id = BankAccount::whereHas('account_type', function ($query) {
                $query->where('name', 'واسط قسط ها');
            })->first();

            $trans = banktransaction::where('bank_id', $bank_id->id)->latest()->get();
            if ($trans->count()  > 0) {
                $exBalance = $trans->first()->bankbalance + $installments->prepaidamount;
            } else {
                $exBalance = +$installments->prepaidamount;
            }
            // $bank_id = createbankaccounts::where();
            $banktransaction = banktransaction::create([
                'bank_id' => $bank_id->id,
                'transactionprice' => $installments->prepaidamount,
                'bankbalance' => $exBalance,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
                'buyer_trans_id' => $user_trans->id
            ]);

            $user->save();
            $installments->statususer = 1;
            $jalaliNow = Jalalian::now()->format('Y-m-d');
            $installments->datepayment = $jalaliNow;
            $installments->save();
            // dd($user->inventory, $installments->prepaidamount);
            return redirect()->back();
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


        // it should be updated.
        $b = BankAccount::first();


        // dd($id, $st);
        $installments = Makeinstallmentsm::find($st);
        $insta_dateils = installmentdetails::find($id);
        $insta_dateils->paymentstatus = 1;
        $installments->paymentstatus = 1;

        $user = User::find($installments->userselected);
        $user->inventory -= $insta_dateils->installmentprice;

        $user_transaction_number = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->count();
        if ($user_transaction_number > 0) {
            $doc_number = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->latest()->first()->documentnumber + 1;
            $final_price = buyertransaction::where('flag', 1)->where('typeoftransaction', 1)->where('user_id', Auth::user()->id)->latest()->first()->finalprice - $installments->Creditamount;
        } else {
            $doc_number = 10000;
            $final_price = -$installments->Creditamount;
        }

        $user_trans = buyertransaction::create([
            'user_id' => Auth::user()->id,
            'flag' => 1,
            'datetransaction' => Jalalian::now(),
            'typeoftransaction' => 1,
            'price' => $installments->Creditamount,
            'finalprice' => $final_price,
            'documentnumber' => $doc_number
        ]);

        if ($recordCount > 0) {
            $lastRecord = banktransaction::latest()->first();
            $bank = new banktransaction();
            $bank->create([
                'bank_id' => $b->id,
                'bankbalance' => $lastRecord->bankbalance + $insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        } else {
            $bank = new banktransaction();
            $bank->create([
                'bank_id' => $b->id,
                'bankbalance' => +$insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        }
        // toster->success('قسط شما با موفقیت پرداخت شد.');

        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط قسط ها');
        })->first();

        $trans = banktransaction::where('bank_id', $bank_id->id)->latest()->get();
        if ($trans->count()  > 0) {
            $exBalance = $trans->first()->bankbalance + $insta_dateils->installmentprice;
        } else {
            $exBalance = +$insta_dateils->installmentprice;
        }
        // $bank_id = createbankaccounts::where();
        $banktransaction = banktransaction::create([
            'bank_id' => $bank_id->id,
            'transactionprice' => $insta_dateils->installmentprice,
            'bankbalance' => $exBalance,
            'transactionsdate' => Jalalian::now()->format('Y-m-d'),
        ]);


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
