<?php

namespace App\Http\Controllers;

use App\Models\DailyCodeModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Morilog\Jalali\Jalalian;
use Yajra\DataTables\Facades\DataTables;

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

    public function dailyCodePring()
    {
        return $this->exportExcel(DailyCodeModel::get());
        return Excel::download(new UsersExport(DailyCodeModel::get()), 'users.xlsx');
    }
}
