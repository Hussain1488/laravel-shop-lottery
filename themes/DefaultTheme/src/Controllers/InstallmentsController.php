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
        if ($user->inventory >= $installments->prepaidamount) {

            $user->inventory -= $installments->prepaidamount;

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

            $user->save();
            $installments->statususer = 1;
            $jalaliNow = Jalalian::now()->format('Y-m-d');
            $installments->datepayment = $jalaliNow;
            $installments->save();
            // dd($user->inventory, $installments->prepaidamount);
            return redirect()->back();
        } else {
            // dd('if');
            return redirect()->back()->with('warning', 'موجودی شما کمتر از مقدار پیش پرداخت است، لطفا کیف پول خود را شارژ نموده دوباره تلاش کنید.');
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

        if ($recordCount > 0) {
            $lastRecord = banktransaction::latest()->first();
            $bank = new banktransaction();
            $bank->create([
                'bank_id' => $b->id,
                'bankbalance' => $lastRecord->bankbalance - $insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        } else {
            $bank = new banktransaction();
            $bank->create([
                'bank_id' => $b->id,
                'bankbalance' => -$insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        }
        // toster->success('قسط شما با موفقیت پرداخت شد.');
        $user->save();
        $insta_dateils->save();
        $installments->save();

        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
