<?php

namespace App\Http\Controllers;

use App\Models\DailyCodeModel;
use Illuminate\Http\Request;

class lotteryController extends Controller
{
    //
    public function index()
    {
        return view('back.lottery.index');
    }

    public function invoiceDatatale()
    {
    }
    public function invoiceDetails()
    {
    }
    public function dailyCode()
    {
        $lastValue = DailyCodeModel::first()->date;
        return view('back.lottery.dailyCode', compact('lastValue'));
    }
    public function generateCode()
    {
        return true;
    }
}
