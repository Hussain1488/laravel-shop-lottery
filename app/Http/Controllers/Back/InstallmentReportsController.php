<?php

namespace App\Http\Controllers\back;

use App\Http\Controllers\Controller;
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
        $installments = Makeinstallmentsm::where('status', 0)->with("seller", "user")->get();
        $installments1 = Makeinstallmentsm::where('status', 1)->with("seller", "user")->get();
        // dd($installments);

        return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
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
        $payment_stat = 'wait';

        $all_installments = Makeinstallmentsm::with("seller", "user")->get();

        $user = User::where('username', 'like', '%' . $request->filter . '%')->get();
        $installments = $all_installments->where('status', 0)->whereIn('userselected', $user->pluck('id'))->all();

        if ($user->isEmpty()) {

            toastr()->warning('قسطی با شماره وارد شده یافت نشد.');
            $installments = Makeinstallmentsm::where('status', 0)->with("seller", "user")->get();
            $installments1 = Makeinstallmentsm::where('status', 1)->with("seller", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
        } else {
            $installments1 = Makeinstallmentsm::where('status', 1)->with("seller", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
            // dd($installments);
        }

        // $installments = $all_installments->whereIn("userselecter, seller_id", )->get();
    }
    public function filter1(Request $request)
    {

        // dd($request->all());
        $payment_stat = 'not_paid';

        $payment_stat = 'not_paid';
        $all_installments = Makeinstallmentsm::with("seller", "user")->get();

        $user = User::where('username', 'like', '%' . $request->filter1 . '%')->get();
        // dd($user);
        $installments1 = $all_installments->where('status', 1)->whereIn('userselected', $user->pluck('id'))->all();
        // dd($installments1);
        if (empty($installments1)) {

            toastr()->warning('قسطی با شماره وارد شده یافت نشد.');
            $installments = Makeinstallmentsm::where('status', 0)->with("seller", "user")->get();
            $installments1 = Makeinstallmentsm::where('status', 1)->with("seller", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
        } else {
            $installments = Makeinstallmentsm::where('status', 0)->with("seller", "user")->get();
            return view('back.installmentreports.index', compact('installments', 'installments1', 'payment_stat'));
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
}
