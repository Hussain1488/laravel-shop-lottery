<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\createstore;
use App\Models\Makeinstallmentsm;
use App\Models\Role;
use App\Models\User;
use App\Models\CooperationSales;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CooperationSalesController extends Controller
{
    //
    public function index()
    {
        $installmentsm = Makeinstallmentsm::where('seller_id', Auth::user()->id)->with('user')->get();
        // $installmentsm = $installmentsm1->where('status', 0);
        // dd($installmentsm);
        return view('back.cooperationsales.index', compact('installmentsm'));
    }
    public function create()
    {
        $shopkeeper = Auth::user();
        // dd($shopkeeper->id);
        $shop = createstore::where('selectperson', $shopkeeper->id)->first();
        // dd($shop);
        $users = User::where('level', 'user')->get();
        // dd($users);

        return view('back.cooperationsales.create', compact('users', 'shop'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
        // dd(Auth::user()->id);
        $Creditamount = intval(str_replace(',', '', $request->Creditamount));
        $prepaidamount = intval(str_replace(',', '', $request->prepaidamount));
        $amounteachinstallment = intval(str_replace(',', '', $request->amounteachinstallment));

        // dd($prepaidamount);

        $user = User::find($request->userselected);
        $user->purchasecredit -= $Creditamount;
        $user->save();



        Makeinstallmentsm::create([
            'status' => 0,
            'seller_id' => Auth::user()->id,
            'Creditamount' => $Creditamount,
            'userselected' => $request->userselected,
            'typeofpayment' => $request->typeofpayment,
            'numberofinstallments' => $request->typeofpayment == 'cash' ? 1 : $request->numberofinstallments,
            'prepaidamount' => $prepaidamount,
            'amounteachinstallment' => $amounteachinstallment,
            'buyerstatus' => 1,
            'paymentstatus' => 1,
            'statususer' => 0,
        ]);
        return redirect()->back();
    }
    public function Income()
    {
        return view('back.cooperationsales.Income');
    }
    public function clearing()
    {
        return view('back.cooperationsales.clearing');
    }
    public function changeStatus($id)
    {
        $newUpdate = Makeinstallmentsm::find($id);
        $newUpdate->status = 1;
        $newUpdate->save();
        return redirect()->back();
    }
}
