<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\ColleagueCreateDocument;
use App\Http\Requests\Back\ColleagueReAccreditionRequest;
use App\Http\Requests\Back\CreateColleagueIndexRequest;
use App\Http\Requests\Back\CreateShopRequest;
use App\Http\Requests\Back\ShopShopUpdateRequest;
use App\Models\ActivityDetailsModel;
use App\Models\BankAccount;
use App\Models\banktransaction;
use App\Models\bankTypeModel;
use App\Models\buyertransaction;
use App\Models\createdocument;
use App\Models\StoreTransactionDetailsModel;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\createstore;
use App\Models\createstoretransaction;
use App\Models\OperatorActivity;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Morilog\Jalali\Jalalian;
use stdClass;
use ZipArchive;

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
        // $users = User::where('level', 'user', 'wallet')->get();

        return view('back.createcolleague.index');
    }

    // creating new seller from users
    public function shopList()
    {

        $store = createstore::with('user')->latest()->paginate(15);
        return view('back.createcolleague.shop_list', compact('store'));
    }
    public function shopListFilter(Request $request)
    {
        // dd(request());
        $filter = $request->filter;
        $store = CreateStore::where(function ($query) use ($filter) {
            $query->where('nameofstore', 'like', '%' . $filter . '%');
        })->orWhereHas('user', function ($query) use ($filter) {
            $query->where('username', 'like', '%' . $filter . '%');
        })->with('user')->latest()->paginate(15);

        if ($store->isEmpty()) {
            $store = createstore::with('user')->latest()->paginate(15);
            toastr()->error('هیچ فروشگاهی برای شما یافت نشد.');
        }
        return view('back.createcolleague.shop_list', compact('store'));
    }

    public function shopedit($id)
    {
        $store = createstore::with('user')->find($id);
        // $jalaliEndDate = Jalalian::fromFormat('Y-m-d', $store->enddate);
        $user = User::get();
        // dd($store);
        return view('back.createcolleague.shop_edit', compact('store', 'user'));
    }

    public function shopUpdate(ShopShopUpdateRequest $request, $id)
    {
        // dd(ActivityDetailsModel::latest()->first()->data);
        $store = createstore::find($id);
        $carbonDate = null;
        $conrn_job_reccredite = intval(str_replace(',', '', $request->conrn_job_reccredite));

        if ($request->enddate != null) {
            $carbonDate = Jalalian::fromFormat('Y-m-d', $request->enddate)->toCarbon()->format('Y-m-d');
        }
        $paths = json_decode($store->uploaddocument);
        $docPath = '';
        if ($request->file('uploaddocument')) {
            $files = $request->file('uploaddocument');
            foreach ($files as $file) {
                $imageName = time() . '_store.' . $file->getClientOriginalExtension();
                $file->move('document/createstore/', $imageName);
                $path = '/document/createstore/' . $imageName;
                $paths[] = $path;
            }
            // dd($paths);
            $docPath = json_encode($paths);
        }
        $originalData = $store->getOriginal();
        // dd($originalData);
        $englishToPersian = [
            'nameofstore' => 'اسم فروشگاه',
            'feepercentage' => 'مقدار کارمز',
            'addressofstore' => 'آدرس فروشگاه',
            'settlementtime' => 'زمان تسویه',
            'enddate' => 'ختم قرارداد',
            'conrn_job_reccredite' => 'اعتبار ماهانه فروشگاه',
            // Add more field mappings as needed
        ];
        $changes = [];
        foreach ($originalData as $key => $value) {
            if ($store->$key != $value) {
                $changes[$key] = [
                    'old' => $value,
                    'new' => $store->$key,
                ];
            }
        }
        $data = ['اسم فروشگاه' => $originalData['nameofstore']];

        foreach ($changes as $key => $change) {
            $fieldPersianName = $englishToPersian[$key] ?? $key;

            // Check if the field has a Persian translation
            if ($fieldPersianName != $key) {
                $data[$fieldPersianName . ' (قبلی)'] = $change['old'];
                $data[$fieldPersianName . ' (جدید)'] = $change['new'];
            }
        }
        try {
            DB::beginTransaction();
            $store->update([
                'nameofstore' => $request->nameofstore,
                'addressofstore' => $request->addressofstore,
                'feepercentage' => $request->feepercentage,
                'settlementtime' => $request->settlementtime,
                'enddate' => $carbonDate != null ? $carbonDate : $store->enddate,
                'uploaddocument' => $docPath,
                'conrn_job_reccredite' => $conrn_job_reccredite,
            ]);

            // dd($store->user_id);
            $operator_id = OperatorActivity::createActivity($store->user_id, 'EDIT_STORE');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            DB::commit();
            toastr()->success('فروشگاه با موفقیت اصلاح شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            toastr()->warning('عملیات اصلاح فروشگاه انجام نشد!' . $e);
        }

        return redirect(route('admin.createcolleague.shopList'));
    }


    public function show($id)
    {
        $store = createstore::find($id);
        $doc = json_decode($store->uploaddocument);
        // dd($doc);

        return view('back.createcolleague.show', compact('store', 'doc'));
    }
    public function fileDownload($id)
    {

        $store = createstore::find($id);
        $zip = new ZipArchive;
        if ($zip->open(public_path('اسناد فروشگاه ' . $store->nameofstore . '.zip'), ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $doc = json_decode($store->uploaddocument);

            foreach ($doc as $document) {
                $filePath = public_path($document);

                // Add file to the zip archive
                $zip->addFile($filePath, basename($filePath));
            }

            $zip->close();

            // Download the zip file
            return response()->download(public_path('اسناد فروشگاه ' . $store->nameofstore . '.zip'))->deleteFileAfterSend(true);
        } else {
            // Handle the case where ZipArchive could not be opened
            return response()->json(['error' => 'Failed to create or open the zip file'], 500);
        }
    }

    public function create()
    {

        // dd(ActivityDetailsModel::first()->data);
        $user = User::where('level', '!=', 'creator')->get();

        $users = [];

        foreach ($user as $key) {
            if (!createstore::where('user_id', $key->id)->exists()) {
                $users[] = $key;
            };
        }
        // $accounts = BankAccount::where('account_type.name', 'درامد')->get();
        $accounts = BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 23);
        })->get();

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
            $query->where('code', 25);
        })->first();
        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اعتبار فروشگاه ها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        $storecredit = intval(str_replace(',', '', $request->storecredit));
        $carbonDate = Jalalian::fromFormat('Y-m-d', $request->enddate)->toCarbon()->format('Y-m-d');
        $docPath = '';
        // dd($storecredit);
        if ($request->file('uploaddocument')) {
            $files = $request->file('uploaddocument');
            $paths = [];
            foreach ($files as $file) {
                $imageName = time() . '_store.' . $file->getClientOriginalExtension();
                $file->move('document/createstore/', $imageName);
                $path = '/document/createstore/' . $imageName;
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }
        // dd($docPath);
        $description = 'اعتبار دهی اولیه فروشگاه';
        $trans_data = [
            'تراکنش:' => $description,
            'اسم فروشگاه:' => $request->nameofstore,
            'توسط:' => Auth::user()->username,
            'مقدار اعتبار:' => number_format($storecredit) . 'ریال',
            'تاریخ:' => Jalalian::now()->format('d/M/Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];
        $data = [
            'اسم فروشگاه' => $request->nameofstore,
            'مقدار اعتبار داده شده' => number_format($storecredit) . ' ریال',
            'مقدار کارمز' => $request->feepercentage . ' درصد',
            'شماره حساب درآمد' => BankAccount::find($request->account_id)->accountnumber,
        ];
        try {

            DB::beginTransaction();
            $store = createstore::create([
                'storecredit' => $storecredit,
                'user_id' => $request->user_id,
                'nameofstore' => $request->nameofstore,
                'addressofstore' => $request->addressofstore,
                'feepercentage' => $request->feepercentage,
                'settlementtime' => $request->settlementtime,
                'enddate' => $carbonDate,
                'uploaddocument' => $docPath,
                'account_id' => $request->account_id,
                'conrn_job_reccredite' => $storecredit,
            ]);
            $trans_id = createstoretransaction::storeTransaction($store, $storecredit, true, 3, 0, null, null, $description);
            StoreTransactionDetailsModel::createDetail($trans_id, $trans_data);
            $bankt_tras = banktransaction::transaction($bank_id->id, $storecredit, false, $trans_id, 'store');

            $operator_id = OperatorActivity::createActivity($request->user_id, 'CREATE_STORE');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);

            DB::commit();

            toastr()->success('!فروشگاه با موفقیت ایجاد شد.');
            return redirect()->back();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            toastr()->warning('مشکلی در ایجاد فروشگاه رخ داده است!' . $e);
            return redirect()->back();
        }
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

        // dd($request->all());
        $carbonDate = Jalalian::fromFormat('Y-m-d', $request->enddate)->toCarbon()->format('Y-m-d');
        $bank_id =   BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 26);
        })->first();
        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت اعتبار خرید خریدارها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        $userUpdate = User::find($request->user_id);
        $paths[] = json_decode($userUpdate->documents);
        $docPath = '';
        if ($request->file('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {

                $imageName = time() . '_usercredit.' . $file->getClientOriginalExtension();
                $file->move('document/usercredite/', $imageName);
                $path = '/document/usercredite/' . $imageName;
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }
        $number = createdocument::count();
        if ($number > 0 && $number != 0) {
            $number = createdocument::latest()->first()->numberofdocuments + 1;
        } else {
            $number = 10000;
        }


        $data = [
            'اعتبار قبلی' => number_format($userUpdate->purchasecredit) . ' ریال',
            'مقدار افزایش اعتبار' => number_format($request->purchasecredit) . ' ریال',
        ];

        try {
            DB::beginTransaction();
            $userUpdate->purchasecredit += $request->purchasecredit;
            $userUpdate->enddate = $carbonDate;

            $operator_id = OperatorActivity::createActivity($userUpdate->id, 'BUYER_CREDIT');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            // public function transaction($user, $amount, $status, $flag, $type)
            $buyer_trans = buyertransaction::transaction($userUpdate, $request->purchasecredit, true, '0', '1', 'افزایش اعتبار توسط اپراتور');
            // transaction($bank_id, $creditAmount, $status, $trans_id)
            $bank_trans = banktransaction::transaction($bank_id->id, $request->purchasecredit, false, $buyer_trans->id, 'user');

            createdocument::create([
                'transaction_id' => $bank_trans->id,
                'user_id' => $userUpdate->id,
                'description' => 'افزایش اعتبار خریدار توسط اپراتور',
                'documents' => $docPath,
                'numberofdocuments' => $number,
            ]);

            $userUpdate->save();
            DB::commit();
            toastr()->success('اعتبار دهی به کاربر با موفقیت انجام شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            log::error($e);
            toastr()->warning('اعتبار دهی به کاربر با خطا روبرو شد!' . $e);
        }
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

        $store = createstore::with('user')->find($request->select_store);
        $ex_credit = $store->storecredit;
        $store->storecredit = $request->storecredit + $ex_credit;

        $bank_id = BankAccount::whereHas('account_type', function ($query) {
            $query->where('code', 25);
        })->first();
        if (!$bank_id) {
            toastr()->error('شما هیچ بانکی با ماهیت واسط اعتبار فروشگاه ها ندارید. لطفا ایجاد نموده دوباره تلاش کنید.');
            return redirect()->back();
        }
        $description = 'افزایش اعتبار فروشگاه';
        $trans_data = [
            'تراکنش:' => $description,
            'توسط:' => Auth::user()->username,
            'اعتبار قبلی' => number_format($ex_credit) . ' ریال',
            'مقدار افزایش اعتبار' => number_format($request->storecredit) . ' ریال',
            'تاریخ:' => Jalalian::now()->format('d/M/Y'),
            'زمان:' => Jalalian::now()->format('H:i:s'),
        ];
        $data = [
            'اسم فروشگاه' => $store->nameofstore,
            'اعتبار قبلی' => number_format($ex_credit) . ' ریال',
            'مقدار افزایش اعتبار' => number_format($request->storecredit) . ' ریال',
        ];
        try {
            DB::beginTransaction();

            $operator_id = OperatorActivity::createActivity($store->user->id, 'STORE_CREDIT');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            $trans_id = createstoretransaction::storeTransaction($store, $request->storecredit, true, 3, 0, null, null, $description);
            StoreTransactionDetailsModel::createDetail($trans_id, $trans_data);
            $bank_trans = banktransaction::transaction($bank_id->id, $request->storecredit, false, $trans_id, 'store');
            $store->save();

            DB::commit();
            toastr()->success('افزایش اعتبار فروشگاه با موفقیت انجام شد.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);

            toastr()->error('مشکلی در افزایش اعتبار فروشگاه رخ داده است!' . $e);
        }

        return redirect()->back();
    }

    // create document view page
    public function createdocument()
    {
        $existingRecords = bankTypeModel::get();
        $newRecord1 = new bankTypeModel();
        $newRecord1->id = 8;
        $newRecord1->code = 28;
        $newRecord1->name = 'فروشگاه';

        $newRecord2 = new bankTypeModel();
        $newRecord2->id = 9;
        $newRecord2->code = 29;
        $newRecord2->name = 'خریدار';

        // Convert the existing records and the new records to arrays
        $existingRecordsArray = $existingRecords->toArray();
        $newRecordArray1 = $newRecord1->toArray();
        $newRecordArray2 = $newRecord2->toArray();

        // Merge the arrays into a single array
        $type = array_merge($existingRecordsArray, [$newRecordArray1, $newRecordArray2]);

        // Display the merged array
        // dd($type);
        $users = User::where('level', 'user')->get();

        return view('back.createcolleague.createdocument', compact('users', 'type'));
    }

    // storing document store function
    public function createDocumentStore(ColleagueCreateDocument $request)
    {
        dd($request->all());
        $user = User::find($request->user_id);
        if ($request->hasFile('documents')) {
            $files = $request->file('documents');
            $paths = [];
            foreach ($files as $file) {

                $imageName = time() . '_DocCreate.' . $file->getClientOriginalExtension();
                $file->move('document/DocCreate/', $imageName);
                $path = '/document/DocCreate/' . $imageName;
                $paths[] = $path;
            }
            $docPath = json_encode($paths);
        }
        $number = createdocument::count();
        if ($number > 0 && $number != 0) {
            $number = createdocument::latest()->first()->numberofdocuments + 1;
        } else {
            $number = 10000;
        }

        // Get the wallet for the user
        $wallet = $user->getWallet();

        try {
            DB::beginTransaction();

            $buyerTrans = buyertransaction::transaction($user, $request->ReCredintAmount, true, '1', '1', 'ایجاد سند مالی');
            $bank = banktransaction::transaction($request->bank_id, $request->ReCredintAmount, false, $buyerTrans->id, 'user');

            $history = $wallet->histories()->create([
                'type'        => 'deposit',
                'amount'      => $request->ReCredintAmount,
                'description' => 'شارژ توسط اپراتور',
                'source'      => 'admin',
                'status'      => 'success'
            ]);
            $data = [
                'موجودی قبلی' => $wallet->balance,
                'مقدار افزایش موجودی' => $request->ReCredintAmount . ' ریال',
            ];
            $wallet->balance += $request->ReCredintAmount;
            createdocument::create([
                'transaction_id' => $bank->id,
                'user_id' => $user->id,
                'description' => $request->description,
                'documents' => $docPath,
                'numberofdocuments' => $number,
            ]);
            $user->save();
            $wallet->save();
            $operator_id = OperatorActivity::createActivity($user->id, 'CREATE_DOCUMNET');
            ActivityDetailsModel::createActivityDetail($operator_id, $data);
            DB::commit();
            toastr()->success('ایجاد سند جدید با شماره ' . $number . ' با موفقیت ثبت گردید.');
            return redirect()->back()->with('number', $number);
        } catch (\Exception $e) {
            DB::rollBack();
        }
        toastr()->warning('متأسفانه عملیات انجام نشد!');
        return redirect()->back();
    }
    public function accountList()
    {
        $account = BankAccount::get(['id', 'bankname']);
        return response()->json($account);
    }
}
