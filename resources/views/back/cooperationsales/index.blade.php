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
                        <h4 class="card-title">اسم کاربر</h4>
                    </div>
                    <div class="card-content">
                        <div class="container mt-3">

                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" style="font-size: 10px" data-toggle="tab" href="#home">در
                                        انتظار تأیید</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu1">اقساط تأیید
                                        نشده</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu3">اقساط تأیید
                                        شده</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu4">خدمات
                                        اینترنتی</a>
                                </li>
                            </ul>

                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div id="home" class="container tab-pane active"><br>
                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            <div class="form-group d-flex align-items-center">
                                                <label for="first_name" class="mr-2">
                                                    مقدار اعتبار خرید اقساطی
                                                </label>
                                                <div class="d-flex">
                                                    <input type="text" placeholder="100,000"
                                                        class="form-control moneyInput" id="first_name" name="first_name">
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12">

                                        </div>
                                    </div>
                                    @foreach ($installmentsm as $key)
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

                                            <div class="row mt-2">
                                                <div class="col">
                                                    مقدار پیش پرداخت {{ $key->prepaidamount }} ریال
                                                </div>
                                                <div class="col d-flex justify-content-end">
                                                    <a href="{{ route('admin.cooperationsales.changeStatus', [$key->id]) }}"
                                                        class="btn btn-success" style="">تأیید</a>
                                                </div>

                                            </div>
                                        </div>
                                    @endforeach


                                    <a href="" class="btn btn-danger my-1">انصراف از فروش</a>
                                </div>
                                <div id="menu1" class="container tab-pane fade"><br>
                                    <h3>Menu 1</h3>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat.</p>
                                </div>
                                <div id="menu2" class="container tab-pane fade"><br>
                                    <h3>Menu 2</h3>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    </div>
@endsection
