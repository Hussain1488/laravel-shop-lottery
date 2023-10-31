@extends('back.layouts.master')

@section('content')
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <div class="breadcrumb-wrapper col-12">
                                <ol class="breadcrumb no-border">
                                    <li class="breadcrumb-item">مدیریت
                                    </li>
                                    <li class="breadcrumb-item">مدیریت کاربران
                                    </li>
                                    <li class="breadcrumb-item active">ایجاد کاربر
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="content-body">
                <section class="card">
                    <div class="card-header">
                        @isset($store)
                            <h4 class="card-title">{{ $store->nameofstore }}</h4>
                        @else
                            <h4 class="text-warning">
                                شما فروشگاهی برای نمایش ندارید!
                            </h4>
                        @endisset
                    </div>
                    <div class="card-content">
                        <div class="container mt-3">

                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active " style="font-size: 10px" data-toggle="tab" href="#home">در
                                        انتظار پرداخت</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu1">اقساط
                                        پرداخت
                                        نشده</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu2">اقساط
                                        پرداخت
                                        شده</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu3">خدمات
                                        اینترنتی</a>
                                </li>
                            </ul>

                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div id="home" class="container tab-pane active"><br>
                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            @isset($store)
                                                <div class="form-group d-flex align-items-center">
                                                    <label for="first_name" class="mr-2">
                                                        مقدار اعتبار فروش اقساطی
                                                    </label>
                                                    <div class="d-flex align-items-center">
                                                        <input readonly type="text" placeholder="100,000"
                                                            class="form-control moneyInput" id="first_name" name="first_name"
                                                            style="margin-left: 4px"
                                                            value="{{ $store->storecredit != null ? $store->storecredit : 0 }}">
                                                        ریال
                                                    </div>

                                                </div>
                                            @endisset
                                        </div>
                                        <div class="col-md-6 col-12">

                                        </div>
                                    </div>
                                    @empty($installmentsm)
                                        <section id="main-card" class="card">
                                            <div class="card-header m-3 ">
                                                <h3 class="text-danger">لیست فروشی برای نمایش به شما وجود ندارد</h3>
                                            </div>
                                        </section>
                                    @else
                                        @foreach ($installmentsm as $key)
                                            @if ($key->statususer == 0)
                                                <div class="border rounded p-2 my-1">
                                                    <div class="row">
                                                        <h5>آقای:
                                                            {{ $key->user->first_name . ' ' . $key->user->last_name }}
                                                        </h5>
                                                    </div>


                                                    <div class="row">
                                                        مبلغ کل فروش:{{ $key->Creditamount }}
                                                    </div>
                                                    <div class="row">
                                                        {{ $key->numberofinstallments }} عدد قسط به سر رسیده
                                                        {{ $key->prepaidamount }} هر ماه به مبلغ قسط
                                                        {{ $key->amounteachinstallment }} ریال
                                                    </div>

                                                    <div class="row">

                                                        مقدار پیش پرداخت {{ $key->prepaidamount }} ریال


                                                    </div>
                                                    <div class="d-flex justify-content-end">

                                                        <a href="{{ route('admin.installments.usrestatus.refuse', [$key->id]) }}"
                                                            class="btn btn-warning ">حذف</a>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @endempty


                                    <a href="" class="btn btn-danger my-1">انصراف از فروش</a>
                                </div>
                                <div id="menu1" class="container tab-pane fade"><br>

                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            @isset($store)
                                                <div class="form-group d-flex align-items-center">
                                                    <label for="first_name" class="mr-2">
                                                        مقدار اعتبار فروش اقساطی
                                                    </label>
                                                    <div class="d-flex align-items-center">
                                                        <input readonly type="text" placeholder="100,000"
                                                            class="form-control moneyInput" id="first_name" name="first_name"
                                                            style="margin-left: 4px"
                                                            value="{{ $store->storecredit != null ? $store->storecredit : 0 }}">
                                                        ریال
                                                    </div>

                                                </div>
                                            @endisset
                                        </div>
                                        <div class="col-md-6 col-12">


                                        </div>
                                    </div>

                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            <div class="form-group d-flex align-items-center">
                                                <h3>
                                                    لیست اقساط تأیید شده
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">

                                        </div>
                                    </div>
                                    @empty($installmentsm)
                                        <section id="main-card" class="card">
                                            <div class="card-header m-3 ">
                                                <h3 class="text-danger">لیست فروشی برای نمایش به شما وجود ندارد</h3>
                                            </div>
                                        </section>
                                    @else
                                        @foreach ($installmentsm as $index)
                                            @if ($index->statususer == 1 && $index->paymentstatus == 0)
                                                @php
                                                    $updated_date = \Carbon\Carbon::parse($index->datepayment);
                                                @endphp
                                                @foreach ($index->installments as $key)
                                                    @if ($key->paymentstatus == 0)
                                                        <div class="border rounded p-2 my-1">
                                                            <div class="row">
                                                                <h5>آقای:
                                                                    {{ $index->user->first_name . ' ' . $index->user->last_name }}
                                                                </h5>
                                                            </div>


                                                            <div class="row">
                                                                مبلغ کل فروش:{{ $index->Creditamount }}
                                                            </div>
                                                            <div class="row">
                                                                قسط به سر رسید
                                                                ({{ \Carbon\Carbon::parse($key->duedate)->format('d') }})
                                                                هر ماه
                                                                به مبلغ قسط
                                                                {{ $key->installmentprice }} ریال
                                                            </div>

                                                            <div class="row ">

                                                                مقدار پیش پرداخت {{ $index->prepaidamount }} ریال


                                                            </div>
                                                            <div class="row d-flex justify-content-between p-1">

                                                                <div>

                                                                    <div class="row">
                                                                        قسط شماره {{ $key->installmentnumber }} به سر رسید
                                                                        تاریخ:
                                                                        {{ \Carbon\Carbon::parse($key->duedate)->format('Y/m/d') }}
                                                                    </div>
                                                                </div>
                                                                <div class="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    @endif
                                                @endforeach

                                                {{-- <div class="border rounded py-1 px-3">

                                                        <div class="row text-center d-flex justify-content-between ">
                                                            <div class="col">

                                                                <h5>
                                                                    اقساط فروشگاه:
                                                                    {{ $key->store->nameofstore != '' ? $key->store->nameofstore : '...' }}
                                                                </h5>
                                                            </div>
                                                            <div class="col">

                                                                <h5>
                                                                    اقساط اقای:
                                                                    {{ $key->user->username != '' ? $key->user->username : '...' }}
                                                                </h5>
                                                            </div>
                                                        </div>

                                                        <div class="row ">
                                                            <div class="col-5">
                                                                1402/2/2
                                                            </div>
                                                            <div class="col-7">
                                                                مبلغ قسط {{ $key->Creditamount }} ریال
                                                            </div>

                                                        </div>

                                                        <div class="row">
                                                            مقدار جریمه دیر کرد ۰ ریال
                                                        </div>
                                                        <div>

                                                        </div>

                                                        <div class="row">
                                                            وضعیت: پرداخت شده در تاریخ ۱۴۰۲/۸/۲۵
                                                        </div>
                                                        <div class="row">
                                                            اقساط:
                                                        </div>

                                                        <div class="row d-flex justify-content-between">
                                                            @php
                                                                $updated_date = \Carbon\Carbon::parse($updated_date)
                                                                    ->addMonth()
                                                                    ->format('Y/m/d');
                                                            @endphp
                                                            <div>

                                                                <div class="row">
                                                                    قسط شماره {{ $i + 1 }} به سر رسید تاریخ:
                                                                    {{ $updated_date }}
                                                                </div>
                                                            </div>
                                                            <div class="">
                                                            </div>
                                                        </div>

                                                    </div> --}}
                                                {{-- @endfor --}}
                                            @endif
                                        @endforeach
                                    @endempty

                                </div>
                                <div id="menu2" class="container tab-pane fade"><br>

                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            @isset($store)
                                                <div class="form-group d-flex align-items-center">
                                                    <label for="first_name" class="mr-2">
                                                        مقدار اعتبار فروش اقساطی
                                                    </label>
                                                    <div class="d-flex align-items-center">
                                                        <input readonly type="text" placeholder="100,000"
                                                            class="form-control moneyInput" id="first_name" name="first_name"
                                                            style="margin-left: 4px"
                                                            value="{{ $store->storecredit != null ? $store->storecredit : 0 }}">
                                                        ریال
                                                    </div>

                                                </div>
                                            @endisset
                                        </div>
                                        <div class="col-md-6 col-12">

                                        </div>
                                    </div>

                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            <div class="form-group d-flex align-items-center">
                                                <h3>
                                                    لیست اقساط پرداخت شده
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">

                                        </div>
                                    </div>

                                    @empty($installmentsm)
                                        <section id="main-card" class="card">
                                            <div class="card-header m-3 ">
                                                <h3 class="text-danger">لیست فروشی برای نمایش به شما وجود ندارد</h3>
                                            </div>
                                        </section>
                                    @else
                                        @foreach ($installmentsm as $value)
                                            @php
                                                $updated_date = \Carbon\Carbon::parse($value->datepayment);

                                            @endphp
                                            @foreach ($value->installments as $key)
                                                @if ($key->paymentstatus == 1)
                                                    <div class="border rounded p-2 my-1">
                                                        <div class="row">
                                                            <h5>آقای:
                                                                {{ $value->user->first_name . ' ' . $value->user->last_name }}
                                                            </h5>
                                                        </div>


                                                        <div class="row">
                                                            مبلغ کل فروش:{{ $value->Creditamount }}
                                                        </div>
                                                        <div class="row">
                                                            قسط به سر رسیده
                                                            ({{ \Carbon\Carbon::parse($key->datepayment)->format('m') }})
                                                            هر ماه
                                                            به مبلغ قسط
                                                            {{ $key->amounteachinstallment }} ریال
                                                        </div>

                                                        <div class="row">
                                                            مقدار پیش پرداخت {{ $value->prepaidamount }} ریال


                                                        </div>
                                                        <div class="row p-1 d-flex justify-content-between">

                                                            <div>

                                                                <div class="row">
                                                                    قسط شماره {{ $key->installmentnumber }} به سر رسید تاریخ:
                                                                    {{ \Carbon\Carbon::parse($key->duedate)->format('Y/m/d') }}
                                                                </div>
                                                            </div>
                                                            <div class="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @endempty

                                </div>
                            </div>
                        </div>

                    </div>

            </div>
            </section>

        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
