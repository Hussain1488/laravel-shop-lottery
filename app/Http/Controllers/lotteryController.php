<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class lotteryController extends Controller
{
    //
    public function index()
    {
        return view('back.lottery.index');
    }
}
