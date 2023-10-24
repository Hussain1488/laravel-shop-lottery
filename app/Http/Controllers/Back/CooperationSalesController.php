<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;

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
        $users = User::all();
        return view('back.cooperationsales.create' , compact('users'));
    }
    public function Income()
    {
        return view('back.cooperationsales.Income');
    }
    public function clearing()
    {
        return view('back.cooperationsales.clearing');
    }
}
