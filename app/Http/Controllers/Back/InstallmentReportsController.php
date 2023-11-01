<?php

namespace App\Http\Controllers\back;

use App\Http\Controllers\Controller;
use App\Models\banktransaction;
use App\Models\Makeinstallmentsm;
use App\Models\User;
use Illuminate\Http\Request;

class InstallmentReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $payment_stat = 'wait';
        $installments = Makeinstallmentsm::where('statususer', 0)->with("store", "user")->get();
        $installments1 = Makeinstallmentsm::where('statususer', 1)->with("store", "user")->get();
        $installments2 = $installments1;
        // dd($installments);

        return view('back.installmentreports.index', compact('installments', 'installments1', 'installments2', 'payment_stat'));
    }
    public function banktransaction()
    {

        $transaction = banktransaction::get();


        return view('back.installmentreports.banktransaction', compact('transaction'));
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

        // $installments = $all_installments->whereIn("userselecter, store_id", )->get();
    }
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



        // $installments = $all_installments->whereIn("userselecter, seller_id", )->get();
    }
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



        // $installments = $all_installments->whereIn("userselecter, seller_id", )->get();
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

    public function refuse($id)
    {
        $refuse = Makeinstallmentsm::find($id);
        $refuse->delete();

        toastr()->success('قسط مورد نظر با موفقیت حذف شد.');
        return redirect()->back();
    }
}
