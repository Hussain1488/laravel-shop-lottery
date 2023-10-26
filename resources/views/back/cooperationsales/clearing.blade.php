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
                        <h4 class="card-title">فروش های پرداخت شده کاربر</h4>
                    </div>
                    <div class="card-content">
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div id="home" class="container tab-pane active"><br>
                                <div class="row">

                                    <div class="col-md-6 col-12">
                                        <div class="form-group d-flex align-items-center">
                                            <label for="first_name" class="mr-2">
                                                موجودی قابل برداشت
                                            </label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" placeholder="100,000" class="form-control moneyInput"
                                                    id="first_name" name="first_name" style="margin-left: 4px;">
                                                <span>ریال</span>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12">

                                    </div>
                                </div>
                                <div class="row my-3">
                                    <div class="col">
                                        <p class="">
                                            لطفا بررسی نمایید که فاکتور هایی که تاریخ روز کاری آن سررسیده است را تسویه
                                            بزنید، تا به موجودی کیف پول شما واریز شده و قابل برداشت باشد.
                                        </p>
                                    </div>
                                </div>
                                <div class="form-group d-flex align-items-center">
                                    <div class="d-flex align-items-center">
                                        <input type="text" class="form-control moneyInput" id="first_name"
                                            name="first_name" style="margin-left: 4px;"> ریال
                                    </div>
                                    <label for="first_name" class="ml-2">
                                        مبلغ درخواست واریز
                                    </label>
                                </div>
                                {{-- <div class="input-group">
                                    <input type="text" aria-label="First name" class="form-control">
                                    <input type="text" style="width: 20px; border-right: none;" class="form-control" value="ریال" disabled>
                                </div> --}}
                                <div class="row mt-4 mb-2">
                                    <p class="text-center">
                                        در صورتی که تأمین کننده کالا فردی غیر از شما میباشد فاکتور فروش از نام فروشنده به
                                        خریدار تهیه و در قسمت عکس فاکتور آپلود نمایید.
                                    </p>


                                </div>
                                <div class="row">
                                    <input type="file" accept=".pdf, .doc" accept-language="fa">
                                    <label for="">افزودن عکس فاکتور فروش</label>
                                    {{-- <br>
                                    <input type="file" class="custom-file-input" id="customFile">
                                    <label class="custom-file-label" for="customFile">انتخاب فایل</label> --}}
                                </div>
                                <div class="row mt-1">
                                    <input type="text">
                                    <label for="">ثبت شماره شبا</label>
                                </div>

                                <div class="my-4 border rounded bg-danger text-dark p-1 text-center">
                                    ثبت شد ۲۹۳۹۷۴۲ شماره پیگیری را روی فاکتور بنویسید
                                    <br>
                                    تا همکاران ما فاکتور را به شما مراجعه کنند و به صورت فیزیکی فاکتور ها را تحویل بگیرند.
                                </div>
                                <div class="row mb-2" style="align-items:center ;display: flex;flex-direction: column;">
                                    <input type="submit" value="تأیید" class="btn btn-lg"
                                        style="background-color: none; text-color:black">
                                </div>

                            </div>

                        </div>
                </section>

            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script>
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
