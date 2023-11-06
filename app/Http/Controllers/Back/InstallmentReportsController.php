<?php

namespace App\Http\Controllers\back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\internalBankStoreRequest;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\createstore;
use App\Models\Makeinstallmentsm;
use App\Models\User;
use Illuminate\Http\Request;

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
        $installments2 = $installments1;
        // dd($installments);

        return view('back.installmentreports.index', compact('installments', 'installments1', 'installments2', 'payment_stat'));
    }

    //  bank transaction list view page
    public function banktransaction()
    {

        $transaction = banktransaction::latest()->get();
        $total  = collect($transaction)->sum('transactionprice');
        // dd($total);

        return view('back.installmentreports.banktransaction', compact('transaction', 'total'));
    }

    public function createinternalaccount()
    {
        $listbank = BankAccount::all();
    
        return view('back.installmentreports.createinternalaccount' , compact('listbank'));
    }
    public function storebank(internalBankStoreRequest $request)
    {
        // dd($request->all());
        BankAccount::create($request->all());

        toastr()->success('حساب بانکی با موفقیت ایجاد شد.');

        return redirect()->back();
        // return view('back.installmentreports.createinternalaccount');
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
        $refuse = Makeinstallmentsm::find($id);
        $refuse->delete();

        toastr()->success('قسط مورد نظر با موفقیت حذف شد.');
        return redirect()->back();
    }
}
