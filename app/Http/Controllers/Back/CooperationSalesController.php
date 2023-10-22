<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CooperationSalesController extends Controller
{
    //
    public function index()
    {
        return view('back.cooperationsales.index');
    }
    public function create()
    {
        return view('back.cooperationsales.create');
    }
}
