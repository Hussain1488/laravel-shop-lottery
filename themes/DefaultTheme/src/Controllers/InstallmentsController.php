<?php

namespace Themes\DefaultTheme\src\Controllers;

use App\Models\installmentdetails;
use App\Models\Makeinstallmentsm;
use Illuminate\Http\Request;
use App\Events\OrderPaid;
use App\Events\WalletAmountIncreased;
use App\Http\Controllers\Controller;
use App\Models\banktransaction;
use App\Models\Gateway;
use App\Models\Transaction;
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

    public function userStatus($id)
    {

        // dd($id);
        $installments = Makeinstallmentsm::find($id);
        $installments->statususer = 1;

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

        $jalaliNow = Jalalian::now()->format('Y-m-d');
        $installments->datepayment = $jalaliNow;
        $installments->save();
        // dd($installments->datepayment);

        return redirect()->back();
    }
    public function paymentStatus($id, $st)
    {

        $bank = new banktransaction();

        $recordCount = banktransaction::count();

        // dd($id, $st);
        $installments = Makeinstallmentsm::find($st);
        $insta_dateils = installmentdetails::find($id);
        $insta_dateils->paymentstatus = 1;
        $installments->paymentstatus = 1;
        $insta_dateils->save();
        $installments->save();

        if ($recordCount > 0) {
            $lastRecord = banktransaction::latest()->first();
            $bank = new banktransaction();
            $bank->create([
                'namebank' => 'Mellat',
                'bankbalance' => $lastRecord->bankbalance - $insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        } else {
            $bank = new banktransaction();
            $bank->create([
                'namebank' => 'Mellat',
                'bankbalance' => -$insta_dateils->installmentprice,
                'transactionprice' => $insta_dateils->installmentprice,
                'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            ]);
        }
        // toster->success('قسط شما با موفقیت پرداخت شد.');

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
    public function refuse()
    {
        dd('this is refuse');
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
