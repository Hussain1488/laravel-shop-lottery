<?php

namespace App\Http\Controllers;

use App\Models\DailyCodeModel;
use App\Models\InvoicesModel;
use App\Models\LotteryCodeModel;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Morilog\Jalali\Jalalian;
use Shetabit\Multipay\Invoice;
use Yajra\DataTables\Facades\DataTables;

class lotteryController extends Controller
{
    //
    public function index()
    {
        return view('back.lottery.index');
    }

    public function lotteryCodeNumbers()
    {
        $query = LotteryCodeModel::query();

        return DataTables::eloquent($query)
            ->addColumn('counter', function () {
                return null;
            })
            ->addColumn('user', function ($query) {
                return $query->user->username;
            })->addColumn('code', function ($query) {
                return $query->code;
            })->addColumn('source', function ($query) {
                return $query->invoice_id ? 'invoice' : 'daily_code';
            })->addColumn('weekly_state', function ($query) {
                return $query->weekly_state;
            })->addColumn('monthly_state', function ($query) {
                return $query->monthly_state;
            })->addColumn('button', function ($query) {
                return $query->id;
            })->make(true);
    }

    public function invoicesIndex()
    {
        return view('back.lottery.invoiceIndex');
    }

    public function invoicesDatatable()
    {
        $query = InvoicesModel::orderByRaw("
                    CASE
                        WHEN state = 'pending' THEN 1
                        WHEN state = 'valid' THEN 2
                        WHEN state = 'not-valid' THEN 3
                        ELSE 4
                    END")->latest();

        return DataTables::eloquent($query)
            ->addColumn('counter', function () {
                return null;
            })->addColumn('date', function ($query) {
                return jdate($query->created_at)->format('Y-m-d');
            })->addColumn('number', function ($query) {
                return $query->number;
            })->filterColumn('number', function ($query, $keyword) {
                $query->where('number', 'like', '%' . $keyword . '%');
            })
            ->addColumn('amount', function ($query) {
                return $query->amount;
            })->filterColumn('amount', function ($query, $keyword) {
                $query->where('amount', 'like', '%' . $keyword . '%');
            })->addColumn('image', function ($query) {
                return asset($query->image);
            })
            ->addColumn('state', function ($query) {
                return $query->state;
            })->addColumn('action', function ($query) {
                return $query->id;
            })->make(true);
    }
    public function invoiceRejection($id = null)
    {

        // return response()->json(['status' => 'error', 'data' => 'انجام عملیات با خطا روبه رو شد!']);
        try {
            $invoice = InvoicesModel::findOrFail($id);
            $invoice->state = 'not-valid';
            $invoice->save();
            return response()->json(['status' => 'success', 'data' => 'عملیات با موفقیت انجام شد!']);
        } catch (\Exception $e) {
            Log::error($e);
            Log::info($id);
            return response()->json(['status' => 'error', 'data' => 'انجام عملیات با خطا روبه رو شد!']);
        }
    }

    public function invoiceValidation(Request $request, $id)
    {
        return response()->json(['status' => 'error', 'data' => 'انجام عملیات با خطا روبه رو شد!']);
        try {
            $invoice = InvoicesModel::find($id);

            for ($i = 0; $i < $request->lottery_code_number; $i++) {
                $code = $this->lotteryCodeGenarator();
                $invoice->lotteryCode()->create([
                    'user_id' => $invoice->user_id,
                    'code' => $code,
                    'weekly_state' => false,
                    'monthly_state' => false,
                    'state' => 'wait',
                ]);
            }
            $invoice->state = 'valid';
            $invoice->save();
            return response()->json(['status' => 'success', 'data' => 'عملیات با موفقیت انجام شده و کدهای قرعه کشی برای کاربر ایجاد شد!']);
        } catch (Exception $e) {
        }
    }
    public function dailyCode()
    {
        $lastValue = DailyCodeModel::latest()->first()->date;
        if (!$lastValue) {
            $lastValue = null;
        }
        // dd($lastValue);
        return view('back.lottery.dailyCode', compact('lastValue'));
    }

    public function dailyCodeDatatable()
    {

        $query = DailyCodeModel::query();

        return DataTables::eloquent($query)
            ->addColumn('counter', function () {
                return null;
            })
            ->addColumn('date', function ($query) {
                return [
                    'date' => jDate($query->date)->format('Y-m-d'),
                    'is_today' => Carbon::parse($query->date)->isToday(),
                ];
            })
            ->addColumn('insta', function ($query) {
                return $query->insta;
            })
            ->addColumn('rubika', function ($query) {
                return $query->rubika;
            })
            ->addColumn('site', function ($query) {
                return $query->site;
            })->make(true);
    }
    public function generateCode()
    {
        // Get the first day of the current month in Jalali format
        $today = Jalalian::now()->getFirstDayOfMonth();

        // Convert Jalali date to Carbon date and format it as 'Y-m-d'
        $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $today->toCarbon()->toDateTimeString());

        // Check if the date exists in the database
        $dateExists = DailyCodeModel::where('date', $carbonDate->format('Y-m-d'))->exists();

        // If the date exists, move to the next month
        $nextMonth = $today->addMonths(1);
        if ($dateExists) {
            $today = $today->addMonths(1);
        }

        // Get the number of days in the current month
        $numDaysInMonth = $nextMonth->subdays()->format('d');

        // Loop through each day of the month
        $daily_codes_to_delete = DailyCodeModel::doesntHave('lotteryCode')->get();
        foreach ($daily_codes_to_delete as $key) {
            $key->delete();
        }
        for ($day = 1; $day <= $numDaysInMonth; $day++) {
            // Create Jalalian date for each day

            $carbonDate = $carbonDate->addDay();

            $rubika = $this->CodeGerator('rubika');
            $site = $this->CodeGerator('site');
            $insta = $this->CodeGerator('insta');
            $DailyCode = [
                'rubika' => $rubika,
                'site' => $site,
                'insta' => $insta,
                'date' => $carbonDate->format('Y-m-d'),
            ];


            DailyCodeModel::create($DailyCode);
        }
        return response('success');
    }


    public function CodeGerator($source)
    {
        $code = rand(111111, 999999);
        $exists = DailyCodeModel::where('insta', $code)
            ->orWhere('rubika', $code)
            ->orWhere('site', $code)
            ->exists();

        if ($exists) {
            $this->CodeGerator($source);
        } else {
            return $code;
        }
    }
    public function lotteryCodeGenarator()
    {
        $code = rand(100000, 999999);
        if (LotteryCodeModel::where('code', $code)->exists()) {
            $this->codeGenarator();
        }

        return $code;
    }


    public function dailyCodePring()
    {
        return $this->exportExcel(DailyCodeModel::get());
        return Excel::download(new UsersExport(DailyCodeModel::get()), 'users.xlsx');
    }
}
