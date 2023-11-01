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
                        {{-- @isset($store) --}}
                        <h4 class="card-title">کاربر خریدار محسن احمد زاده</h4>
                        {{-- @else
                            <h4 class="text-warning">
                                شما فروشگاهی برای نمایش ندارید!
                            </h4>
                        @endisset --}}
                    </div>




                    <div class="card-content">
                        <div class="container mt-3">

                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link {{ $payment_stat == 'wait' ? 'active' : '' }} "
                                        style="font-size: 10px" data-toggle="tab" href="#home">در
                                        انتظار تأیید</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link {{ $payment_stat == 'not_paid' ? 'active' : '' }}"
                                        style="font-size: 10px" data-toggle="tab" href="#menu1">اقساط
                                        پرداخت
                                        نشده</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link {{ $payment_stat == 'paid' ? 'active' : '' }}"
                                        style="font-size: 10px" data-toggle="tab" href="#menu2">اقساط
                                        پرداخت
                                        شده</a>
                                </li>
                            </ul>

                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div id="home"
                                    class="container tab-pane {{ $payment_stat == 'wait' ? 'active' : 'fade' }}"><br>

                                    <form action="{{ route('admin.installments.filter') }}" method="get">
                                        @csrf
                                        <div class="row ">

                                            <div class="col-md-6 col-12 d-flex justify-content-around">

                                                <h4>
                                                    فیلتر بر اساس شماره تلفن
                                                </h4>

                                                <div class="d-flex">
                                                    <input type="text" name="filter" class="form-control w-auto mr-1"
                                                        placeholder="شماره تلفن را برای فیلتر وارد کنید">
                                                    <input type="submit" class="btn btn-info" value="فیلتر">
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                            </div>
                                        </div>
                                    </form>

                                    <div class="row mt-1 ml-2">
                                        <h3>
                                            لیست اقساطی که در انتظار نشده:
                                        </h3>
                                    </div>

                                    @if (empty($installments))
                                        <div class="row mt-3 ml-2">
                                            <h4>
                                                هیچ قسطی برای نمایش وجود ندارد!
                                            </h4>
                                        </div>
                                    @else
                                        @foreach ($installments as $key)
                                            @if ($key->statususer == 0)
                                                <div class="border rounded p-2 my-1">
                                                    <div class="row d-flex justify-content-around">
                                                        <h5>
                                                            قسط فروشگاه:
                                                            {{ $key->store->nameofstore != '' ? $key->store->nameofstore : '...' }}
                                                        </h5>
                                                        <form action="{{ route('admin.installments.filter') }}"
                                                            method="get">
                                                            @csrf
                                                            <input type="hidden" value="{{ $key->user->username }}"
                                                                name="filter" id="">
                                                            <button class="btn"
                                                                style="border:none; background-color:none" type="submit">
                                                                <h5>قسط آقای: {{ $key->user->username }}
                                                                </h5>
                                                            </button>
                                                        </form>
                                                    </div>


                                                    <div class="row">
                                                        مبلغ کل فروش:{{ $key->Creditamount }}
                                                    </div>
                                                    <div class="row">
                                                        {{ $key->numberofinstallments }} عدد قسط به سر رسیده
                                                        ۶ هر ماه به مبلغ قسط
                                                        {{ $key->amounteachinstallment }} ریال
                                                    </div>

                                                    <div class="row mt-2">
                                                        <div class="col">
                                                            مقدار پیش پرداخت {{ $key->prepaidamount }} ریال
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @endif
                                    {{-- @endif --}}
                                    {{-- @endforeach --}}
                                    {{-- @endempty --}}


                                </div>
                                <div id="menu1"
                                    class="container tab-pane {{ $payment_stat == 'not_paid' ? 'active' : 'fade' }}"><br>

                                    <form action="{{ route('admin.installments.filter1') }}" method="get">
                                        @csrf
                                        <div class="row ">

                                            <div class="col-md-6 col-12 d-flex justify-content-around">

                                                <h4>
                                                    فیلتر بر اساس شماره تلفن
                                                </h4>

                                                <div class="d-flex">
                                                    <input type="text" name="filter1" class="form-control w-auto mr-1"
                                                        placeholder="شماره تلفن را برای فیلتر وارد کنید">
                                                    <input type="submit" class="btn btn-info" value="فیلتر">
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                            </div>
                                        </div>
                                    </form>



                                    <div class="row mt-1 ml-2">
                                        <h3>
                                            لیست اقساط پرداخت نشده:
                                        </h3>
                                    </div>

                                    @if (empty($installments1))
                                        <div class="row mt-3 ml-2">
                                            <h4>
                                                هیچ قسطی برای نمایش وجود ندارد!
                                            </h4>
                                        </div>
                                    @else
                                        @foreach ($installments1 as $value)
                                            @if ($value->statususer == 1)
                                                @foreach ($value->installments as $key)
                                                    @if ($key->paymentstatus == 0)
                                                        <div class="border rounded p-2 my-1">
                                                            <div class="row d-flex justify-content-around">
                                                                <h5>
                                                                    قسط فروشگاه: {{ $value->store->nameofstore }}
                                                                </h5>
                                                                <form action="{{ route('admin.installments.filter1') }}"
                                                                    method="get">
                                                                    @csrf
                                                                    <input type="hidden"
                                                                        value="{{ $value->user->username }}" name="filter1"
                                                                        id="">
                                                                    <button class="btn"
                                                                        style="border:none; background-color:none"
                                                                        type="submit">
                                                                        <h5>قسط آقای: {{ $value->user->username }}
                                                                        </h5>
                                                                    </button>
                                                                </form>
                                                            </div>


                                                            <div class="row">
                                                                مبلغ کل فروش:{{ $value->Creditamount }}
                                                            </div>
                                                            <div class="row">
                                                                قسط شماره {{ $key->installmentnumber }}به سر رسید
                                                                {{ \Carbon\Carbon::parse($key->duedate)->format('m') }}
                                                                هر ماه به مبلغ قسط
                                                                {{ $key->installmentprice }} ریال
                                                            </div>

                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    مقدار پیش پرداخت {{ $value->prepaidamount }} ریال
                                                                </div>
                                                            </div>
                                                        </div>
                                                    @endif
                                                @endforeach
                                            @endif
                                        @endforeach
                                    @endif
                                </div>
                                <div id="menu2"
                                    class="container tab-pane {{ $payment_stat == 'paid' ? 'active' : 'fade' }}"><br>

                                    <form action="{{ route('admin.installments.filter2') }}" method="get">
                                        @csrf
                                        <div class="row ">

                                            <div class="col-md-6 col-12 d-flex justify-content-around">

                                                <h4>
                                                    فیلتر بر اساس شماره تلفن
                                                </h4>

                                                <div class="d-flex">
                                                    <input type="text" name="filter1" class="form-control w-auto mr-1"
                                                        placeholder="شماره تلفن را برای فیلتر وارد کنید">
                                                    <input type="submit" class="btn btn-info" value="فیلتر">
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                            </div>
                                        </div>
                                    </form>

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

                                    @if (empty($installments2))
                                        <div class="row mt-3 ml-2">
                                            <h4>
                                                هیچ قسطی برای نمایش وجود ندارد!
                                            </h4>
                                        </div>
                                    @else
                                        @foreach ($installments2 as $value)
                                            @if ($value->paymentstatus == 1)
                                                @foreach ($value->installments as $key)
                                                    @if ($key->paymentstatus == 1)
                                                        <div class="border rounded p-2 my-1">
                                                            <div class="row d-flex justify-content-around">
                                                                <h5>
                                                                    قسط فروشگاه: {{ $value->store->nameofstore }}
                                                                </h5>
                                                                <form action="{{ route('admin.installments.filter2') }}"
                                                                    method="get">
                                                                    @csrf
                                                                    <input type="hidden"
                                                                        value="{{ $value->user->username }}"
                                                                        name="filter1" id="">
                                                                    <button class="btn"
                                                                        style="border:none; background-color:none"
                                                                        type="submit">
                                                                        <h5>قسط آقای: {{ $value->user->username }}
                                                                        </h5>
                                                                    </button>
                                                                </form>
                                                            </div>


                                                            <div class="row">
                                                                مبلغ کل فروش:{{ $value->Creditamount }}
                                                            </div>
                                                            <div class="row">
                                                                قسط شماره {{ $key->installmentnumber }}به سر رسید
                                                                {{ \Carbon\Carbon::parse($key->duedate)->format('m') }}
                                                                هر ماه به مبلغ قسط
                                                                {{ $key->installmentprice }} ریال
                                                            </div>

                                                            <div class="row mt-2">
                                                                <div class="col">
                                                                    مقدار پیش پرداخت {{ $value->prepaidamount }} ریال
                                                                </div>
                                                            </div>
                                                        </div>
                                                    @endif
                                                @endforeach
                                            @endif
                                        @endforeach
                                    @endif

                                </div>
                            </div>
                        </div>

                    </div>

                </section>
            </div>

        </div>
    </div>
@endsection
