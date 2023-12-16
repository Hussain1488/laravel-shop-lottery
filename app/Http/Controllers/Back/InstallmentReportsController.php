<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\internalBankStoreRequest;
use App\Models\ActivityDetailsModel;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\bankTypeModel;
use App\Models\createstore;
use App\Models\createstoretransaction;
use App\Models\Makeinstallmentsm;
use App\Models\OperatorActivity;
use App\Models\paymentdetails;
use App\Models\PaymentListModel;
use App\Models\StoreTransactionDetailsModel;
use App\Models\User;
use CreateTypeOfAccountTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Morilog\Jalali\Jalalian;
use function PHPUnit\Framework\isEmpty;

class InstallmentReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //  installment report index view page with all installmnet records.
    public function index()
    {

        $payment_stat = 'wait';
        $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
        $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
        // dd($installments);

        return view('back.installmentreports.index', compact('installments', 'installments1',  'payment_stat'));
    }
    public function payRequestlist()
    {
        $transaction = PaymentListModel::with('store')->latest()->get();
        $total[1] = $transaction->where('status', 1)->sum('depositamount');
        $total[0] = $transaction->where('status', 0)->sum('depositamount');
        $bank =  BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 21);
        })->get();

        return view('back.installmentreports.PayRequestList', compact('transaction', 'total', 'bank'));
    }

    public function RequestPayment($id, $bank_id, $trans_id)
    {

        $payList = PaymentListModel::with('store')->find($id);
        $payList->status = 1;

        $bankt_trans = banktransaction::transaction($bank_id, $payList->depositamount, true, $trans_id, 'store');
        $payList->save();


        return true;
    }

    public function RequestPaymentStore(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'Issuetracking' => 'required',
            'nameofbank' => 'required',
            'documentpayment' => 'required',
        ]);

        if ($validator->fails()) {
            toastr()->warning('درخواست انجام نشد لطفاً فرم را به درستی پر کنید!');
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // dd($request->all());
        $bank_name = $request->nameofbank;
        if ($request->hasFile('documentpayment')) {

            $imageName = time() . '_clearing.' . $request->file('documentpayment')->getClientOriginalExtension();
            $request->file('documentpayment')->move('document/payDetails/', $imageName);
            $path = '/document/payDetails/' . $imageName;
        } else {
            $path = '';
        }

        $payList = PaymentListModel::find($request->pay_list_id);

        $store = createstore::find($payList->store_id);
        $description = 'پرداخت درخواست واریز';
        $trans_data = [
            'تراکنش:' => $description,
            'توسط:' => Auth::user()->username,
            'مقدار تراکنش' => $payList->depositamount . ' ریال',
            'تاریخ:' => Jalalian::now()->format('d-m-Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];
        $data = [
            'فروشگاه' => $store->nameofstore,
            'مقدار پرداخت' => $payList->depositamount . ' ریال',
            'شماره پیگیری بانک' => $request->Issuetracking,
        ];
        try {
            DB::beginTransaction();
            paymentdetails::create([
                'list_of_payment_id' => $request->pay_list_id,
                'Issuetracking' => $request->Issuetracking,
                'nameofbank'  => $bank_name,
                'documentpayment'  => $path,
            ]);

            $operator_id = OperatorActivity::createActivity($store->user->id, 'PAY_REQUEST_PAYMENT');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            $trans_id = createstoretransaction::storeTransaction($store, $payList->depositamount, true, 1, 2, null, null, $description);
            StoreTransactionDetailsModel::createDetail($trans_id, $trans_data);

            $this->RequestPayment($request->pay_list_id, $request->nameofbank, $trans_id);
            DB::commit();
            toastr()->success('اطلاعات پرداخت موفقیت آمیز ذخیره شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            toastr()->error('مشکلی در ذخیره اطلاعات پرداخت رخ داده است.' . $e);
        }
        return redirect()->back();
    }
    //  bank transaction list view page
    public function banktransaction()
    {

        $transaction = banktransaction::with('bank')->latest()->get();
        $total  = collect($transaction)->sum('transactionprice');

        return view('back.installmentreports.banktransaction', compact('transaction', 'total'));
    }

    public function bankList()
    {
        $listbank = BankAccount::with('account_type')->get();

        return view('back.installmentreports.bank_list', compact('listbank'));
    }

    public function createinternalaccount()
    {
        $listbank = BankAccount::all();
        $types = bankTypeModel::all();

        return view('back.installmentreports.createinternalaccount', compact('listbank', 'types'));
    }
    public function storebank(internalBankStoreRequest $request)
    {
        // dd($request->all());
        BankAccount::create([
            'bankname' => $request->bankname,
            'accountnumber' => $request->accountnumber,
            'account_type_id' => $request->account_type_id,
        ]);
        bankTypeModel::find($request->account_type_id)->name;
        $data = [
            'اسم بانک' => $request->bankname,
            'شماره بانک' => $request->accountnumber,
            'ماهیت حساب' => bankTypeModel::find($request->account_type_id)->name,
        ];
        try {
            DB::beginTransaction();
            $operator_id = OperatorActivity::createActivity(null, 'CREATE_INTERNAL_ACCOUNT');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            DB::commit();
            toastr()->success('حساب بانکی با موفقیت ایجاد شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            toastr()->warning('خطایی در ایجاد حساب بانکی جدید رخ داده است!' . $e);
        }
        return redirect()->back();
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

    // filtering accordint to phone number in installments view page in waiting to validate tab.
    public function filter(Request $request)
    {
        // dd($request->all());
        $payment_stat = 'wait';

        $all_installments = Makeinstallmentsm::with("store", "user")->get();

        $user = User::where('username', 'like', '%' . $request->filter . '%')->get();
        $installments = $all_installments->where('statususer', 0)->whereIn('userselected', $user->pluck('id'))->all();

        if ($user->isEmpty()) {

            toastr()->warning('قسطی با شماره وارد شده یافت نشد.');
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
        } else {
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'installments2', 'payment_stat'));
            // dd($installments);
        }
    }

    // filtering accordint to phone number in installments view page in not_paid to validate tab.
    public function filter1(Request $request)
    {

        // dd($request->all());
        $payment_stat = 'not_paid';

        $payment_stat = 'not_paid';
        $all_installments = Makeinstallmentsm::with("store", "user")->get();

        $user = User::where('username', 'like', '%' . $request->filter1 . '%')->get();
        // dd($user);
        $installments1 = $all_installments->where('status', 1)->whereIn('userselected', $user->pluck('id'))->all();
        // dd($installments1);
        if (empty($installments1)) {

            toastr()->warning('قسطی با شماره وارد شده یافت نشد.');
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
        } else {
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'installments2', 'payment_stat'));
            // dd($installments);
        }
    }
    // filtering accordint to phone number in installments view page in paid to validate tab.

    public function filter2(Request $request)
    {

        // dd($request->all());
        $payment_stat = 'paid';
        $all_installments = Makeinstallmentsm::with("store", "user")->get();

        $user = User::where('username', 'like', '%' . $request->filter1 . '%')->get();
        // dd($user);
        $installments2 = $all_installments->where('statususer', 1)->whereIn('userselected', $user->pluck('id'))->all();
        // dd($installments1);
        if (empty($installments2)) {

            toastr()->warning('قسطی با شماره وارد شده یافت نشد.');
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
        } else {
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'installments2', 'payment_stat'));
            // dd($installments);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    //  showing the installmnets of specific store's installments
    public function show_shop_installments($id, $slug)
    {
        // dd($id, $slug);

        if ($slug == 'wait') {
            $payment_stat = 'wait';
        } else if ($slug == 'not_paid') {
            $payment_stat = 'not_paid';
        } else if ($slug == 'paid') {
            $payment_stat = 'paid';
        }
        $shop = createstore::where('id', $id)->first();
        $installments = Makeinstallmentsm::where('statususer', 0)->where('store_id', $id)->with("store", "user")->get();
        $installments1 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $id)->with("store", "user")->get();
        $installments2 = $installments1;
        // dd($installments2);

        return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
    }

    //  filtering the records of installmnets of specific store's installments accorgin to  user ID

    public function show_shop_installments_filter(Request $request)
    {
        // dd($request->all());
        $shop = createstore::where('id', $request->store)->first();


        if ($request->payment_stat == 'wait') {
            $payment_stat = 'wait';
            // dd('it is in wait');
            $installments = Makeinstallmentsm::where('statususer', 0)->where('store_id', $request->store)->where('userselected', $request->user)->with("store", "user")->get();

            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = $installments1;

            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        } else if ($request->payment_stat == 'not_paid') {
            // dd('it is in not paid');
            $payment_stat = 'not_paid';
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->where('userselected', $request->user)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();

            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        } else if ($request->payment_stat == 'paid') {
            // dd('it is in paid');
            $payment_stat = 'paid';
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->where('userselected', $request->user)->with("store", "user")->get();


            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        }
    }

    //  filtering the records of installmnets of specific store's installments accorgin to phone number input

    public function show_shop_installments_filter_name(Request $request)
    {
        // dd($request->all());
        $user = User::where('username', 'like', '%' . $request->filter . '%')->get();
        // dd($user);
        $shop = createstore::where('id', $request->store)->first();

        if ($user->isEmpty()) {
            $payment_stat = $request->payment_stat;
            $installments = Makeinstallmentsm::where('statususer', 0)->where('store_id', $request->store)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->with("store", "user")->get();

            toastr()->warning("هیچ کاربری با شماره وارده یافت نشد.");

            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        }

        if ($request->payment_stat == 'wait') {
            $payment_stat = 'wait';
            // dd('it is in wait');
            $installments = Makeinstallmentsm::where('statususer', 0)->where('store_id', $request->store)->whereIn('userselected', $user->pluck('id'))->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->with("store", "user")->get();
            $installments2 = $installments1;


            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        } else if ($request->payment_stat == 'not_paid') {
            // dd('it is in not paid');
            $payment_stat = 'not_paid';
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->whereIn('userselected', $user->pluck('id'))->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();



            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        } else if ($request->payment_stat == 'paid') {
            // dd('it is in paid');
            $payment_stat = 'paid';
            $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
            $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
            $installments2 = Makeinstallmentsm::where('statususer', 1)->where('store_id', $request->store)->whereIn('userselected', $user->pluck('id'))->with("store", "user")->get();


            return view('back.installmentreports.shop_installments', compact('installments', 'installments1', 'installments2', 'payment_stat', 'shop'));
        }
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


    // destroying the specific installments.
    public function refuse($id)
    {
        try {
            DB::beginTransaction();
            Makeinstallmentsm::refuse($id);
            DB::commit();
            toastr()->success('قسط مورد نظر با موفقیت حذف شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            toastr()->error('مشکلی در حذف فروش  رخ داده است.' . $e);
        }
        return redirect()->back();
    }

    public function transactionFilter($id)
    {
        $title = BankAccount::find($id)->bankname;
        $transactions = BankTransaction::where('bank_id', $id)
            ->with('bank.account_type', 'buyerTransaction.user', 'storeTransaction.store.user')
            ->latest()
            ->get();

        $log = false;

        $total = $transactions->first()->bankbalance ?? 0;

        foreach ($transactions as $key) {
            if ($key->storeTransaction != null) {
                $key->log = $key->storeTransaction !== null;
            }
        }


        return view('back.installmentreports.banktransaction', compact('transactions', 'total', 'title', 'log'));
    }

    public function paidList()
    {
        // dd('hey');

        $paidList = paymentdetails::with('payments.store')->get();
        $paidList = $paidList->map(function ($item) {
            $item->date = Jalalian::fromCarbon($item->created_at)->format('Y-m-d');
            return $item;
        });
        // dd($paidList);
        return view('back.installmentreports.paidList', compact('paidList'));
    }
}
