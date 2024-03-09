<?php

namespace Themes\DefaultTheme\src\controllers;

use App\Http\Controllers\Controller;
use App\Models\DailyCodeModel;
use App\Models\InvoicesModel;
use App\Models\LotteryCodeModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LotteryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //  going to installments records of user

    public function index()
    {
        $lottery = LotteryCodeModel::where('user_id', Auth::user()->id)->latest()->paginate(15);
        $invoice = InvoicesModel::where('user_id', Auth::user()->id)->latest()->paginate(15);
        return view('front::user.lottery.index', compact('lottery', 'invoice'));
    }

    public function dailyCode(Request $request)
    {
        $code = DailyCodeModel::where($request->code_source, $request->daily_code)->first();
        if (!$code) {
            return response()->json(['status' => 'error', 'data' => 'کد وارد شده یا منبع انتخاب شده برای کد معتبر نمیباشد!']);
        }
        if (LotteryCodeModel::where('daily_code', $request->daily_code)->where('user_id', Auth::user()->id)->exists()) {

            return response()->json(['status' => 'error', 'data' => 'این کد یکبار توسط شما استفاده شده و دوباره نمیتوانید با این کد درخواست کد قرعه کشی بدهید!']);
        }
        if (Carbon::now()->format('Y-m-d') !== $code->date) {

            return response()->json(['status' => 'error', 'data' => 'کد وارد شده برای امروز نمیباشد!']);
        } else {
            // ['user_id', 'code', 'daily_code', 'invoice_id', 'weekly_state', 'monthly_state', 'state'];
            $code = $this->codeGenarator();
            $lotteryCode = LotteryCodeModel::create([
                'user_id' => Auth::user()->id,
                'code' => $code,
                'daily_code' => $request->daily_code,
                'weekly_state' => false,
                'monthly_state' => false,
                'state' => 'wait',
            ]);
        }
        return response()->json(['status' => 'success', 'data' => $code]);
    }
    public function codeGenarator()
    {
        $code = rand(100000, 999999);
        if (LotteryCodeModel::where('code', $code)->exists()) {
            $this->codeGenarator();
        }

        return $code;
    }

    public function invoiceCode(Request $request)
    {
        // dd($request->all());
        $file = $request->file('invoice_img');
        // dd($file);
        $imageName = time() . '_invoice.' . $file->getClientOriginalExtension();
        $file->move('document/userImg/', $imageName);
        $image_path = '/document/userImg/' . $imageName;
        // dd($request->number);
        $codeExists = InvoicesModel::where('number', $request->number)->exists();
        if (!$codeExists) {

            $newInvoice = InvoicesModel::create([
                'user_id' => Auth::user()->id,
                'number' => $request->number,
                'image' => $image_path,
                'state' => 'pending',
                'amount' => $request->amount
            ]);
            toastr()->success('اطلاعات فاکتور شما با موفقیت ثبت شد، بعد از تأیید کد قرعه کشی برای شما ایجاد میشود!');
        } else {
            toastr()->warning('شماره فاکتور وارد شده قبلا استفاده شده است!');
        }
        return redirect()->back();
        // return response()->json(['status' => 'success', 'data', 'اطلاعات فاکتور شما با موفقیت ثبت شد، بعد از تأیید کد قرعه کشی برای شما ایجاد میشود!']);
    }
}
