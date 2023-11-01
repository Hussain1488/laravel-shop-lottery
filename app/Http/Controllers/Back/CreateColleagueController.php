<?php

namespace App\Http\Controllers\back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\ColleagueCreateDocument;
use App\Http\Requests\Back\ColleagueReAccreditionRequest;
use App\Http\Requests\Back\CreateColleagueIndexRequest;
use App\Http\Requests\Back\CreateShopRequest;
use App\Models\createdocument;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\createstore;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CreateColleagueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where('level', 'user')->get();
        return view('back.createcolleague.index', compact('users'));
    }


    public function create()
    {

        $user =  User::where('level', 'user')->orwhere('level', 'seller')->get();
        $users = [];
        foreach ($user as $key) {
            if ($key->level == 'user' || ($key->level == 'seller' && !createstore::where('selectperson', $key->id)->exists())) {
                $users[] = $key;
            };
        }

        // dd($users);

        // dd($users);
        return view('back.createcolleague.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateShopRequest $request)
    {

        // dd($request->all());

        $storecredit = intval(str_replace(',', '', $request->storecredit));

        $docPath = '';
        // dd($request->all());
        if ($request->file('uploaddocument')) {
            $files = $request->file('uploaddocument');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/createstore', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }
        $person = User::find($request->selectperson);
        $person->level = 'seller';
        $person->save();

        // dd(json_decode($docPath, true));

        createstore::create([
            'storecredit' => $storecredit,
            'selectperson' => $request->selectperson,
            'nameofstore' => $request->nameofstore,
            'addressofstore' => $request->addressofstore,
            'feepercentage' => $request->feepercentage,
            'enddate' => $request->enddate,
            'uploaddocument' => $docPath,

        ]);

        $users = User::where('level', 'user')->get();

        toastr()->success('  فروشگاه با موفقیت ایجاد شد.');

        // dd($users);
        return view('back.createcolleague.create', compact('users'));
    }



    public function createcreditoperator(Request $request)
    {
        $users = User::where('level', 'user')->get();


        return view('back.createcolleague.createcreditoperator', compact('users'));
    }

    public function storecreditoperator(Request $request)
    {

        $request->validate([
            'user' => 'required',
        ], [
            'user.required' => 'فیلد کاربر الزامی است',
        ]);

        $user = User::find($request->user);

        $user->level = 'createcreditoperator';
        // dd($users);
        $user->save();

        $users = User::where('level', 'user')->get();

        toastr()->success('اپراتور اعتبار سنجی با موفقیت ایجاد شد.');

        return view('back.createcolleague.createcreditoperator', compact('users'));
    }

    public function colleagueCreditStore(CreateColleagueIndexRequest $request)
    {


        // dd('hey');
        $docPath = '';
        // dd($request->all());
        if ($request->file('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/usercredite', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }
        // dd($docPath);
        // $purchasecredit = intval(str_replace(',', '', $request->purchasecredit));
        // $inventory = intval(str_replace(',', '', $request->inventory));


        $userUpdate = User::find($request->userselected);
        $userUpdate->purchasecredit = $request->purchasecredit;
        $userUpdate->enddate = $request->enddate;
        $userUpdate->documents = $docPath;
        // dd($userUpdate);
        $userUpdate->save();

        toastr()->success('اعتبار دهی به کاربر با موفقیت انجام شد.');


        return redirect()->back();
    }



    public function reaccreditationIndex()
    {
        $store = createstore::with('user')->get();
        return view('back.createcolleague.reaccreditation', compact('store'));
    }





    public function reaccreditationStore(ColleagueReAccreditionRequest $request)
    {
        $store = createstore::find($request->select_store);
        // dd($store);
        $ex_credit = $store->storecredit;
        $store->storecredit = $request->storecredit + $ex_credit;
        $store->save();
        toastr()->success('افزایش اعتبار فروشگاه با موفقیت انجام شد.');

        return redirect()->back();
    }

    public function createdocument()
    {
        $users = User::where('level', 'user')->get();
        $number = createdocument::count();
        if ($number > 0 && $number != 0) {
            $number = createdocument::latest()->first()->numberofdocuments + 1;
        } else {
            $number = 10000;
        }

        // dd($number);
        return view('back.createcolleague.createdocument', compact('users', 'number'));
    }

    public function createDocumentStore(ColleagueCreateDocument $request)
    {
        // dd($request->all());

        $user = User::find($request->namecreditor);
        // dd($user);


        if ($request->hasFile('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/DocCreate', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }

        $user->inventory += $request->price;

        createdocument::create([
            'namedebtor' => $request->namedebtor,
            'namecreditor' => $user->first_name,
            'price' => $request->price,
            'documents' => $docPath,
            'numberofdocuments' => $request->numberofdocuments,
        ]);

        // dd($request->numberofdocuments);
        $user->save();

        toastr()->success('ایجاد سند جدید با شماره ' . $request->numberofdocuments . ' با موفقیت ثبت گردید.');


        return redirect()->back();
    }





    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}
