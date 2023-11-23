<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\CornJobStoreRequest;
use App\Models\CornjobModel;
use Illuminate\Http\Request;

class CornjobController extends Controller
{
    public function index()
    {

        $cornjobs = CornjobModel::latest()->get();

        return view('back.cornjob.index', compact('cornjobs'));
    }
    public function create()
    {
        return view('back.cornjob.setting');
    }
    public function store(CornJobStoreRequest $request)
    {

        $this->authorize('cornjob');

        $except = [
            'store_reccredition_status',
        ];

        $cornjob = $request->except($except);

        foreach ($cornjob as $key => $value) {
            option_update($key, $value);
        }

        foreach ($except as $option) {
            if ($request->$option) {
                option_update($option, 'on');
            } else {
                option_update($option, 'off');
            }
        }
        toastr()->success('تغییرات کرن جاب با موفقیت ذخیره شد');
        return redirect()->back();
    }
}
