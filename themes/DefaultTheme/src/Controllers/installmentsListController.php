<?php

namespace Themes\DefaultTheme\src\Controllers;

use App\Models\installmentdetails;
use App\Models\Makeinstallmentsm;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\OrderPaid;
use App\Events\WalletAmountIncreased;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\buyertransaction;
use App\Models\createstore;
use App\Models\Gateway;
use App\Models\Transaction;
use App\Models\User as ModelsUser;
use App\Models\WalletHistory;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Morilog\Jalali\Jalalian;
use Shetabit\Payment\Facade\Payment;
use Shetabit\Multipay\Invoice;

class installmentsListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function purchaseList()
    {
        $trans = buyertransaction::latest()->get();
        $latest = buyertransaction::latest()->first()->finalprice;
        return view('front::user.installments.installment_list', compact('trans', 'latest'));
    }
}
