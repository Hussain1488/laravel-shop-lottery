<?php

namespace App\Http\Controllers\back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\ColleagueCreateDocument;
use App\Http\Requests\Back\ColleagueReAccreditionRequest;
use App\Http\Requests\Back\CreateColleagueIndexRequest;
use App\Http\Requests\Back\CreateShopRequest;
use App\Http\Requests\Back\ShopShopUpdateRequest;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\buyertransaction;
use App\Models\createdocument;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\createstore;
use App\Models\createstoretransaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Morilog\Jalali\Jalalian;

class CreateColleagueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // going to create colleague index view page
    public function index()
    {
        $users = User::where('level', '!=', 'creator')->get();
        return view('back.createcolleague.index', compact('users'));
    }

    // creating new seller from users
    public function shopList()
    {

        $store = createstore::with('user')->get();


        return view('back.createcolleague.shop_list', compact('store'));
    }
    public function shopListFilter(Request $request)
    {
        $filter = $request->filter;
        $store = CreateStore::where('nameofstore', 'like', '%' . $filter . '%')->get();
        // dd($store);
        if ($store->isEmpty()) {
            $store = createstore::with('user')->get();
            toastr()->error('هیچ فروشگاهی برای شما یافت نشد.');
        }
        return view('back.createcolleague.shop_list', compact('store'));
    }

    public function shopedit($id)
    {

        $store = createstore::with('user')->find($id);
        $jalaliEndDate = Jalalian::fromFormat('Y-m-d', $store->enddate);
        $carbonEndDate = Carbon::createFromFormat('Y-m-d H:i:s', $jalaliEndDate->toCarbon()->toDateTimeString());
        $store->enddate = $carbonEndDate;
        $user = User::get();
        // dd($store);

        return view('back.createcolleague.shop_edit', compact('store', 'user'));
    }

    public function shopUpdate(ShopShopUpdateRequest $request, $id)
    {

        $store = createstore::find($id);

        $storecredit = intval(str_replace(',', '', $request->storecredit));

        $newCredit = $store->storecredit + $storecredit;

        $paths = json_decode($store->uploaddocument);
        $docPath = '';
        if ($request->file('uploaddocument')) {
            $files = $request->file('uploaddocument');
            foreach ($files as $file) {
                $path = $file->store('document/createstore', 'public');
                $paths[] = $path;
            }
            // dd($paths);
            $docPath = json_encode($paths);
        }


        // dd($request);
        $store->update([
            'storecredit' => $newCredit,
            'nameofstore' => $request->nameofstore,
            'addressofstore' => $request->addressofstore,
            'feepercentage' => $request->feepercentage,
            'settlementtime' => $request->settlementtime,
            'enddate' => $request->enddate != null ? $request->enddate : $store->enddate,
            'uploaddocument' => $docPath,
        ]);

        toastr()->success('فروشگاه با موفقیت اصلاح شد.');

        return redirect(route('admin.createcolleague.shopList'));
    }


    public function show($id)
    {
        $store = createstore::find($id);
        $doc = json_decode($store->uploaddocument);
        // dd($doc);

        return view('back.createcolleague.show', compact('store', 'doc'));
    }

    public function create()
    {

        $user =  User::where('level', '!=', 'creator')->get();
        $users = [];
        foreach ($user as $key) {
            if ($key->level != 'user' || !createstore::where('selectperson', $key->id)->exists()) {
                $users[] = $key;
            };
        }
        // $accounts = BankAccount::where('account_type.name', 'درامد')->get();
        $accounts = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'درآمد');
        })->get();


        // dd($users);

        // dd($users);
        return view('back.createcolleague.create', compact('users', 'accounts'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // storing new store
    public function store(CreateShopRequest $request)
    {


        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط اعتبار فروش فروشگاه ها');
        })->first();
        if ($bank_id) {
            $bank_id = BankAccount::whereHas('account_type', function ($query) {
                $query->where('name', 'واسط اعتبار فروش فروشگاه ها');
            })->first();
        } else {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اعتبار فروشگاه ها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }

        // dd($request->all());

        $storecredit = intval(str_replace(',', '', $request->storecredit));

        $docPath = '';
        // dd($storecredit);
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
        // $person->level = 'seller';
        $person->save();

        $store = createstore::create([
            'storecredit' => $storecredit,
            'selectperson' => $request->selectperson,
            'nameofstore' => $request->nameofstore,
            'addressofstore' => $request->addressofstore,
            'feepercentage' => $request->feepercentage,
            'settlementtime' => $request->settlementtime,
            'enddate' => $request->enddate,
            'uploaddocument' => $docPath,
            'account_id' => $request->account_id
        ]);

        $trans_id = createstoretransaction::storeTransaction($store, $storecredit, true, 1, 0);

        $bankt_tras = banktransaction::transaction($bank_id->id, $storecredit, true, $trans_id, 'store');

        toastr()->success('  فروشگاه با موفقیت ایجاد شد.');

        // dd($users);
        return redirect()->back();
    }



    // changin the level of user as user to createcreditoperator
    public function createcreditoperator(Request $request)
    {
        $users = User::where('level', 'user')->get();


        return view('back.createcolleague.createcreditoperator', compact('users'));
    }

    // storing storecreditoperator level for user


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

    // giving credit to user store function
    public function colleagueCreditStore(CreateColleagueIndexRequest $request)
    {

        $docPath = '';

        if ($request->file('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/usercredite', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }

        $account =   BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'مقدار اعتبار خرید خریدارها');
        })->first();

        if ($account) {
            $bank_id = $account->id;
        } else {
            toastr()->error('شما هیچ بانکی با ماهیت اعتبار خرید خریدارها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }

        $userUpdate = User::find($request->userselected);
        $userUpdate->purchasecredit += $request->purchasecredit;
        $userUpdate->enddate = $request->enddate;
        $userUpdate->documents = $docPath;
        // public function transaction($user, $amount, $status, $flag, $type)
        $buyer_trans = buyertransaction::transaction($userUpdate, $request->purchasecredit, true, 0, 0);
        // transaction($bank_id, $creditAmount, $status, $trans_id)
        $bank_trans = banktransaction::transaction($bank_id, $request->purchasecredit, false, $buyer_trans->id, 'user');

        $userUpdate->save();

        toastr()->success('اعتبار دهی به کاربر با موفقیت انجام شد.');


        return redirect()->back();
    }



    // adding credit to store view page
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

        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'واسط اعتبار فروش فروشگاه ها');
        })->first();
        if ($bank_id) {
            $bank_id = BankAccount::whereHas('account_type', function ($query) {
                $query->where('name', 'واسط اعتبار فروش فروشگاه ها');
            })->first();
        } else {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اعتبار فروشگاه ها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }

        $trans_id = createstoretransaction::storeTransaction($store, $request->storecredit, true, 1, 0);


        $bank_trans = banktransaction::transaction($bank_id->id, $request->storecredit, false, $trans_id, 'store');

        $store->save();
        toastr()->success('افزایش اعتبار فروشگاه با موفقیت انجام شد.');

        return redirect()->back();
    }

    // create document view page
    public function createdocument()
    {

        $bank = BankAccount::whereHas('account_type', function ($query) {
            $query->where('name', 'بانک');
        })->get();

        $users = User::where('level', 'user')->get();
        $number = createdocument::count();
        if ($number > 0 && $number != 0) {
            $number = createdocument::latest()->first()->numberofdocuments + 1;
        } else {
            $number = 10000;
        }

        // dd($number);
        return view('back.createcolleague.createdocument', compact('users', 'number', 'bank'));
    }

    // storing document store function
    public function createDocumentStore(ColleagueCreateDocument $request)
    {

        $user = User::find($request->namecreditor);


        $buyerTrans = buyertransaction::transaction($user, $request->ReCredintAmount, true, 1, 0);

        // transaction($bank_id, $creditAmount, $status, $trans_id)
        $bank = banktransaction::transaction($request->namedebtor, $request->ReCredintAmount, false, $buyerTrans->id, 'user');


        if ($request->hasFile('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {
                $path = $file->store('document/DocCreate', 'public');
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }

        $user->inventory += $request->ReCredintAmount;

        // dd($request->all());
        createdocument::create([
            'namedebtor' => $request->namedebtor,
            'namecreditor' => $user->first_name,
            'price' => $request->ReCredintAmount,
            'description' => $request->description,
            'documents' => $docPath,
            'numberofdocuments' => $request->numberofdocuments,
        ]);



        // dd($request->numberofdocuments);
        $user->save();

        toastr()->success('ایجاد سند جدید با شماره ' . $request->numberofdocuments . ' با موفقیت ثبت گردید.');


        return redirect()->back()->with('number', $request->numberofdocuments);
    }
}
