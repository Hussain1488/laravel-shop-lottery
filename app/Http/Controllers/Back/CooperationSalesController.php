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
use App\Models\StoreTransactionDetailsModel;
use Carbon\Carbon;
use CreateStoreTransactionDetailsTable;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        $shop = createstore::where('selectperson', $shopkeeper->id)->first();
        $jalaliEndDate = Jalalian::fromFormat('Y-m-d', $shop->enddate);
        $carbonEndDate = Carbon::createFromFormat('Y-m-d H:i:s', $jalaliEndDate->toCarbon()->toDateTimeString());
        $shop->enddate = $carbonEndDate;

        $users = User::where('level', 'user')->get();

        return view('back.cooperationsales.create', compact('users', 'shop'));
    }

    // storing new installments function
    public function store(Request $request)
    {
        // dd($request);
        $store = createstore::find($request->store_id);
        $Creditamount = intval(str_replace(',', '', $request->Creditamount));
        $prepaidamount = intval(str_replace(',', '', $request->prepaidamount));
        $amounteachinstallment = intval(str_replace(',', '', $request->amounteachinstallment));

        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 25);
        })->first();
        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اعتبار فروشگاه ها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }

        $user = User::find($request->userselected);
        $description = 'انجام فروش(ساخت قسط)';
        $trans_data = [
            'تراکنش:' => $description,
            'توسط:' => Auth::user()->username,
            'برای:' => User::find($request->userselected)->username,
            'مقدار تراکنش:' => $Creditamount . 'ریال',
            'نوع فروش:' => $request->typeofpayment == 'cash' ? 'نقدی' : 'اقساطی',
            'تعداد قسط:' => $request->typeofpayment == 'cash' ? 0 : $request->numberofinstallments,
            'تاریخ:' => Jalalian::now()->format('d-m-Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];

        try {
            DB::beginTransaction();
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
            $store_trans = createstoretransaction::storeTransaction($store, $Creditamount, false, 3, 0, $request->userselected, null, $description);
            StoreTransactionDetailsModel::createDetail($store_trans, $trans_data);
            $bankt_tras = banktransaction::transaction($bank_id->id, $Creditamount, false, $store_trans, 'store');


            $store->save();
            toastr()->success('قسط کاربر با موفقیت ایجاد شد.');

            DB::commit();
        } catch (\Exception $e) {

            DB::rollBack();
            Log::error($e);
            toastr()->error('مشکلی در ایجاد قسط کاربر به وجود آمده است.' . $e);
        }
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

        $bank_id =   BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 24);
        })->first();
        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اقساط ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        // dd($account);
        // dd($request->all());
        $store = createstore::find($request->store);
        $depositamount = str_replace(',', '', $request->depositamount);
        $docPath = '';
        if ($request->hasFile('factor')) {
            // dd($request->file('factor'));
            $files = $request->file('factor');
            $paths = [];
            foreach ($files as $file) {

                $imageName = time() . '_clearing.' . $file->getClientOriginalExtension();
                $file->move('document/ClearingDoc/', $imageName);
                $path = '/document/ClearingDoc/' . $imageName;
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
        $description = 'درخواست تسویه';
        $trans_data = [
            'تراکنش:' => $description,
            'توسط:' => Auth::user()->username,
            'مقدار درخواست:' => $depositamount . 'ریال',
            'تاریخ:' => Jalalian::now()->format('d-m-Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];
        // creating new payment request transaction.
        try {
            DB::beginTransaction();
            $transaction = createstoretransaction::storeTransaction($store, $depositamount, false, 0, 1, $user = null, $timestamp = null, $description);

            PaymentListModel::create([
                'list_id' => $number,
                'store_id' => $request->store,
                'depositamount' => $depositamount,
                'final_price' => $final_price,
                'shabanumber' => $request->shabanumber,
                'factor' => $docPath,
                'depositdate' => Jalalian::now()->format('Y-m-d'),
                'trans_id ' => $transaction,
            ]);
            // creating new store transaction for mainWallet transaction.
            StoreTransactionDetailsModel::createDetail($transaction, $trans_data);
            $bank_trans = banktransaction::transaction($bank_id->id, $depositamount, false, $transaction, 'store');
            $store->save();

            DB::commit();
            toastr()->success('درخواست تسویه حساب با موفقیت ارسال شد.');
            return redirect()->back()->with('register_number', $register_number);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            toastr()->error('خطایی در ارسال درخواست رخ داده است!.' . $e);
        }
        return redirect()->back();
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

        $bank_id =   BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 24);
        })->first();

        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اقساط ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        $description = 'درخواست واریز';
        $store = createstore::find($id);
        // dd($store);
        $fee = $store->feepercentage;
        $installment = Makeinstallmentsm::find($id2);
        $result = $installment->Creditamount * $fee / 100;
        $final = $installment->Creditamount - $result;
        $trans_data = [
            'تراکنش:' => $description,
            'توسط:' => Auth::user()->username,
            'مقدار درخواست با کسر کارمزد:' => $final . 'ریال',
            'کارمزد:' => $result . 'ریال',
            'تاریخ:' => Jalalian::now()->format('d-m-Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];

        try {
            DB::beginTransaction();

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
            $transaction = createstoretransaction::storeTransaction($store, $installment->Creditamount, true, 1, 1, $installment->userselected, $installment->updated_at, $description);
            StoreTransactionDetailsModel::createDetail($transaction, $trans_data);
            $bank_trans = banktransaction::transaction($store->account_id, $result, true, $transaction, 'store');

            $bank_trans = banktransaction::transaction($bank_id->id, $installment->Creditamount, false, $transaction, 'store');

            $installment->save();
            $store->save();
            DB::commit();
            toastr()->success('درخواست تسویه حساب موفقیت آمیز انجام شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            toastr()->error('مشکلی در درخواست تسویه حساب رخ داده است!!' . $e);
        }
        return redirect()->back();
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


        return view('back.cooperationsales.mainwallet', compact('trans', 'store', 'total'));
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
        $flag = 'تراکنش های فروش های پرداخت شده';

        return view('back.cooperationsales.transaction_records', compact('trans', 'store', 'total', 'flag'));
    }
    public function creditTrans($id)
    {
        $trans = createstoretransaction::where('flag', 0)->where('typeoftransaction', 3)->where('store_id', $id)->latest()->get();
        $store = createstore::find($id);
        if (count($trans) > 0) {
            $total = createstoretransaction::where('flag', 0)->where('typeoftransaction', 3)->where('store_id', $id)->latest()->first()->finalprice;
        } else {
            $total = 0;
        }
        $flag = 'تراکنش های اعتبار فروشگاه';

        return view('back.cooperationsales.transaction_records', compact('trans', 'store', 'total', 'flag'));
    }
    public function transactionDetails($id)
    {
        $details = StoreTransactionDetailsModel::where('transaction_id', $id)->first()->data;
        // dd($details);
        return response()->json($details);
    }
}
