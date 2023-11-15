<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\createstore;
use App\Models\Makeinstallmentsm;
use App\Models\Role;
use App\Models\User;
use App\Models\CooperationSales;
use App\Models\createstoretransaction;
use App\Models\PaymentListModel;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Melipayamak\MelipayamakApi;
use Morilog\Jalali\Jalalian;
use ParagonIE\Sodium\Compat;

class CooperationSalesController extends Controller
{
    //Cooperation Sales index page
    public function index()
    {
        $installmentsm = Makeinstallmentsm::where('seller_id', Auth::user()->id)->with('store', 'user')->get();
        $store = createstore::where('selectperson', Auth::user()->id)->first();

        $today = Carbon::now();

        foreach ($installmentsm as $key) {
            if ($key->datepayment != null) {
                $jalaliDate = Jalalian::fromFormat('Y-m-d', $key->datepayment);
                $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $jalaliDate->toCarbon()->toDateTimeString());
                $key->CarbonDate = $carbonDate;
            }
        }

        return view('back.cooperationsales.index', compact('installmentsm', 'store', 'today'));
    }

    //Creating new installments page
    public function create()
    {
        $shopkeeper = Auth::user();
        // dd($shopkeeper->id);
        $shop = createstore::where('selectperson', $shopkeeper->id)->first();
        $jalaliEndDate = Jalalian::fromFormat('Y-m-d', $shop->enddate);
        $carbonEndDate = Carbon::createFromFormat('Y-m-d H:i:s', $jalaliEndDate->toCarbon()->toDateTimeString());
        $shop->enddate = $carbonEndDate;
        // dd($shop->enddate);
        // dd($shop);
        $users = User::where('level', 'user')->get();
        // dd($users);

        return view('back.cooperationsales.create', compact('users', 'shop'));
    }

    // storing new installments function
    public function store(Request $request)
    {

        $store = createstore::find($request->store_id);
        $Creditamount = intval(str_replace(',', '', $request->Creditamount));
        $prepaidamount = intval(str_replace(',', '', $request->prepaidamount));
        $amounteachinstallment = intval(str_replace(',', '', $request->amounteachinstallment));

        $user = User::find($request->userselected);
        $user->purchasecredit -= $Creditamount;
        $store->storecredit -= $Creditamount;

        Makeinstallmentsm::create([
            'status' => 0,
            'seller_id' => Auth::user()->id,
            'Creditamount' => $Creditamount,
            'userselected' => $request->userselected,
            'typeofpayment' => $request->typeofpayment,
            'numberofinstallments' => $request->typeofpayment == 'cash' ? 0 : $request->numberofinstallments,
            'prepaidamount' => $prepaidamount,
            'amounteachinstallment' => $amounteachinstallment,
            'buyerstatus' => 0,
            'paymentstatus' => 0,
            'statususer' => 0,
            'store_id' => $store->id,
        ]);

        $store_trans = createstoretransaction::storeTransaction($store, $Creditamount, false, 0, 0);

        $store->save();
        $user->save();

        toastr()->success('قسط کاربر با موفقیت ایجاد شد.');


        return redirect()->back();
    }

    // going to income view page
    public function Income()
    {
        return view('back.cooperationsales.Income');
    }

    // going to clearing view page
    public function clearing()
    {
        $store = createstore::where('selectperson', Auth::user()->id)->first();

        return view('back.cooperationsales.clearing', Compact('store'));
    }
    public function clearingStore(Request $request)
    {

        $account =   BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط قسط ها');
        })->first();

        if ($account) {
            $bank_id = $account->id;
        } else {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اقساط ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        // dd($request->all());
        $store = createstore::find($request->store);
        $depositamount = str_replace(',', '', $request->depositamount);
        $docPath = '';
        if ($request->hasFile('factor')) {
            // dd($request->file('factor'));
            $files = $request->file('factor');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/ClearingDoc', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }

        $number = PaymentListModel::count();
        if ($number > 0 && $number != 0) {
            $number = PaymentListModel::latest()->first()->list_id  + 1;
            $final_price = PaymentListModel::latest()->first()->final_price  + $depositamount;
        } else {
            $final_price = $depositamount;
            $number = 10000;
        }
        // dd($final_price);
        $store->salesamount -= $depositamount;
        $register_number = $number;
        // creating new payment request transaction.
        PaymentListModel::create([
            'list_id' => $number,
            'store_id' => $request->store,
            'depositamount' => $depositamount,
            'final_price' => $final_price,
            'shabanumber' => $request->shabanumber,
            'factor' => $docPath,
            'depositdate' => Jalalian::now()->format('Y-m-d'),
        ]);
        // creating new
        $transaction = new createstoretransaction();
        $number1 = createstoretransaction::count();

        if ($number1 > 0 && $number1 != 0) {
            $number1 = createstoretransaction::latest()->first()->documentnumber  + 1;
            $final_price1 = createstoretransaction::latest()->first()->finalprice - $depositamount;
        } else {
            $number1 = 10000;
            $final_price1 = -$depositamount;
        }
        // creating new store transaction for mainWallet transaction.
        $transaction->create([
            'store_id' => $request->store,
            'datetransaction' => Jalalian::now()->format('Y-m-d'),
            // 1 is for main wallet
            'flag' => 1,
            // pay request
            'typeoftransaction' => 0,
            'price' => $depositamount,
            'finalprice' => $final_price1,
            'documentnumber' => $number1,
            // 'bank_id' => $request->;
        ]);


        $trans = banktransaction::where('bank_id', $bank_id->id)->latest()->get();
        if ($trans->count()  > 0) {
            $exBalance = $trans->first()->bankbalance - $depositamount;
        } else {
            $exBalance = -$depositamount;
        }
        // $bank_id = createbankaccounts::where();
        $banktransaction = banktransaction::create([
            'bank_id' => $bank_id->id,
            'transactionprice' => $depositamount,
            'bankbalance' => $exBalance,
            'transactionsdate' => Jalalian::now()->format('Y-m-d'),
            'store_trans_id' => $transaction->id

        ]);

        $store->save();

        toastr()->success('درخواست تسویه حساب با موفقیت ارسال شد.');

        return redirect()->back()->with('register_number', $register_number);
    }

    // changing the status of installments status to paid.
    public function changeStatus($id)
    {
        $newUpdate = Makeinstallmentsm::find($id);
        $newUpdate->status = 1;
        $newUpdate->save();
        return redirect()->back();
    }
    public function PayRequest($id, $id2)
    {


        // $transaction = new createstoretransaction();
        // dd($id);
        $store = createstore::find($id);
        // dd($store);
        $fee = $store->feepercentage;
        $installment = Makeinstallmentsm::find($id2);
        $result = $installment->Creditamount * $fee / 100;
        $final = $installment->Creditamount - $result;
        // dd($final, $result);
        $store->salesamount += $final;
        $installment->status = 1;

        $number = createstoretransaction::count();

        if ($number > 0 && $number != 0) {
            $number = createstoretransaction::latest()->first()->documentnumber  + 1;
            // $final_price = createstoretransaction::latest()->first()->finalprice;
        } else {
            $number = 10000;
            // $final_price =
        }

        $transaction = createstoretransaction::create([
            'store_id' => $id,
            'datetransaction' => Jalalian::now()->format('Y-m-d'),
            // 1 is for main wallet
            'flag' => 1,
            // pay request
            'typeoftransaction' => 1,
            'price' => $installment->Creditamount,
            'finalprice' => $store->salesamount,
            'documentnumber' => $number,
        ]);

        // $incomeBank = BankAccount::find($store->account_id);
        // $bank_trans_record = banktransaction::where('bank_id', $incomeBank->id)->latest()->get();
        // if (count($bank_trans_record) > 0) {
        //     $final1 =
        //         banktransaction::where('bank_id', $incomeBank->id)->latest()->first()->bankbalance + $result;
        // } else {
        //     $final1 = +$result;
        // }
        // $incomeTrans = banktransaction::create([
        //     'bank_id' => $store->account_id,
        //     'bankbalance' => $final1,
        //     'transactionprice' => $result,
        //     'transactionsdate' => Jalalian::now(),
        //     'store_trans_id' => $transaction->id
        // ]);

        // public function transaction($bank_id, $creditAmount, $status, $trans_id, $user)
        $bank_trans = banktransaction::transaction($store->account_id, $result, false, $transaction->id, 'store');

        $installment->save();
        $store->save();
        toastr()->success('درخواست تصفیه حساب موفقیت آمیز انجام شد.');
        return redirect()->back();
    }
    public function smsTest()
    {
        // dd($_ENV['MELIPAYAMAK_USER']);

        try {
            $username = $_ENV['MELIPAYAMAK_USER'];
            $password = $_ENV['MELIPAYAMAK_PASSWORD'];;
            $api = new MelipayamakApi($username, $password);
            $sms = $api->sms();
            $to = '09038261488';
            $from = '50004001000143';
            $text = 'سلام حسین چطوری این تست دوم است';
            $response = $sms->send($to, $from, $text);
            $json = json_decode($response);
            echo $json->Value; //RecId or Error Number
        } catch (Exception $e) {
            echo $e->getMessage();
            // dd($e->getMessage());
        }
    }
    public function mainWallet($id)
    {

        $trans = createstoretransaction::where('flag', 1)->where('store_id', $id)->latest()->get();
        // dd(count($trans));
        if (count($trans) > 0) {
            $total = createstoretransaction::where('flag', 1)->where('store_id', $id)->latest()->first()->finalprice;
        } else {
            $total = 0;
        }
        $store = createstore::find($id);


        return view('back.cooperationsales.transaction_records', compact('trans', 'store', 'total'));
    }
    public function payRequestWallet($id)
    {

        $trans = PaymentListModel::where('store_id', $id)->latest()->get();
        $store = createstore::find($id);
        if (count($trans) > 0) {
            $total = PaymentListModel::where('store_id', $id)->latest()->first()->final_price;
        } else {
            $total = 0;
        }
        return view('back.cooperationsales.pay_trans', compact('trans', 'store', 'total'));
    }
    public function paidSales($id)
    {

        $trans = createstoretransaction::where('flag', 2)->where('store_id', $id)->latest()->get();
        $store = createstore::find($id);
        if (count($trans) > 0) {
            $total = createstoretransaction::where('flag', 2)->where('store_id', $id)->latest()->first()->finalprice;
        } else {
            $total = 0;
        }
        return view('back.cooperationsales.transaction_records', compact('trans', 'store', 'total'));
    }
}
