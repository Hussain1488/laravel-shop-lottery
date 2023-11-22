<?php

namespace App\Http\Controllers\back;
use App\Models\user;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OperatorActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $operatorusers = user::where('level' , 'user')->with('slug', 'فروشنده')->get();
        // $bank_id = user::whereHas('users', function ($query) {
        //     $query->where('slug', 'فروشنده');
        // })->first();
        $users = User::whereHas('roles', function ($query)  {
            $query->where('slug', 'فروشنده');
        })->get();
        return view('back.operatoractivity.index' , compact('users'));
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
