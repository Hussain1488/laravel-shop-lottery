<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\createstore;
use App\Models\Makeinstallmentsm;
use App\Models\Role;
use App\Models\User;
use App\Models\CooperationSales;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        // dd($prepaidamount);

        $user = User::find($request->userselected);
        $user->purchasecredit -= $Creditamount;
        $store->storecredit -= $Creditamount;

        // dd($store->id);


        Makeinstallmentsm::create([
            'status' => 0,
            'seller_id' => Auth::user()->id,
            'Creditamount' => $Creditamount,
            'userselected' => $request->userselected,
            'typeofpayment' => $request->typeofpayment,
            'numberofinstallments' => $request->typeofpayment == 'cash' ? 1 : $request->numberofinstallments,
            'prepaidamount' => $prepaidamount,
            'amounteachinstallment' => $amounteachinstallment,
            'buyerstatus' => 0,
            'paymentstatus' => 0,
            'statususer' => 0,
            'store_id' => $store->id,
        ]);

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
        dd($request->all());
        // $store = createstore::where('selectperson', Auth::user()->id)->first();

        return view('back.cooperationsales.clearing', Compact('store'));
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
        $installment->save();
        $store->save();
        toastr()->success('درخواست تصفیه حساب موفقیت آمیز انجام شد.');
        return redirect()->back();
    }
}
