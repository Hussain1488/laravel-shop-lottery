<?php

namespace App\Http\Controllers\Back;

use App\Models\user;
use App\Http\Controllers\Controller;
use App\Models\ActivityDetailsModel;
use App\Models\OperatorActivity;
use Illuminate\Http\Request;
use Morilog\Jalali\Jalalian;
use Yajra\DataTables\Facades\DataTables;

class OperatorActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $users = User::where('level', '!=', 'user')->with('roles')->latest()->paginate(15);
        return view('back.operatoractivity.index', compact('users'));
    }


    public function search(Request $request)
    {

        $users = User::where('level', 'admin')->where('username', 'like', '%' . $request->filter . '%')->with('roles')->latest()->paginate(15);;
        if ($users->count() == 0) {
            $users = User::where('level', 'admin')->with('roles')->latest()->paginate(15);
            toastr()->warning('هیج اپراتوری با جستجوی شما یافت نشد');
        }
        return view('back.operatoractivity.index', compact('users'));
    }
    public function filter(Request $request)
    {

        $operations = [];
        $users = User::where('username', 'like', '%' . $request->filter . '%')->get();
        foreach ($users as $user) {
            $userOperations = OperatorActivity::where('operator_id', $request->operator)->where('user_id', $user->id)->with('user')->latest()->paginate(20);;
            $operations = array_merge($operations, $userOperations->all());
        }
        if ($users->count() == 0) {
            $operations = OperatorActivity::where('operator_id', $request->operator)->with('user')->latest()->paginate(20);
            toastr()->warning('هیج فعالیتی برای کاربر یافت نشد');
        }

        $operator = User::find($request->operator);

        // dd($operations, $operator);
        return view('back.operatoractivity.show', compact('operations', 'operator'));
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
        // $operations = OperatorActivity::where('operator_id', $id)->with('user')->latest()->paginate(20);
        $operator = User::find($id);
        // dd($id);
        return view('back.operatoractivity.show', compact('operator'));
    }
    public function getOperatorActivityData(Request $request)
    {
        $operatorId = $request->input('operator_id');

        $operations = OperatorActivity::query()->with('user')->where('operator_id', $operatorId);


        return DataTables::eloquent($operations)
            ->addColumn('counter', function () {
                // static $counter = 0; // Use static to persist the counter across rows
                return null;
            })
            ->addColumn('formatted_date', function ($operation) {
                return jdate($operation->created_at)->format('H:i:s Y-m-d');
            })
            ->addColumn('username', function ($operation) {
                return $operation->user ? $operation->user->username : '<span class="text-danger">گیرنده ندارد</span>';
            })->filterColumn('username', function ($query, $keyword) {
                $query->whereHas('user', function ($query) use ($keyword) {
                    $query->where('username', 'like', '%' . $keyword . '%');
                });
            })
            ->addColumn('details_action', function ($operation) {
                $dataDate = jdate($operation->created_at)->format('Y-m-d');
                $dataTime = $operation->created_at->format('H:i:s');
                $dataAction = route('admin.operatoractivity.details', [$operation->id]);
                return [
                    'data_date' => $dataDate,
                    'data_time' => $dataTime,
                    'data_action' => $dataAction,
                ];
            })
            ->rawColumns(['details_action', 'username']) // Mark 'details_action' as raw HTML
            ->make(true);
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
    public function details($id)
    {
        $activity['data'] = OperatorActivity::find($id);
        $activity['data']->created_at = Jalalian::fromCarbon($activity['data']->created_at)->format('Y-m-d');
        $activity['details'] = ActivityDetailsModel::where('activity_id', $id)->first();

        return response()->json($activity);
    }
}
