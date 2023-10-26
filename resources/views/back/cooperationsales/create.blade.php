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


                @isset($shop)
                    <section id="main-card" class="card">
                        <div class="card-header">
                            <h4 class="card-title">پنل اصلی فروشات {{ $shop->nameofstore }}</h4>
                        </div>

                        <div id="main-card" class="card-content">
                            <div class="card-body">
                                <div class="col-12 col-md-10 offset-md-1">
                                    <form class="form" id="user-create-form"
                                        action="{{ route('admin.cooperationsales.store') }}" method="post"
                                        enctype="multipart/form-data">
                                        @csrf
                                        <div class="form-body">
                                            <div class="row">

                                                <div class="col-md-6 col-12">
                                                    <div class="form-group d-flex align-items-center">
                                                        <div class="d-flex align-items-center">
                                                            <input readonly id="purchase_creadite" type="text"
                                                                placeholder="100,000" class="form-control moneyInput"
                                                                id="first_name" name="Creditamount" value="0"
                                                                style="margin-left: 4px">
                                                            ریال
                                                        </div>
                                                        <label for="first_name" class="ml-2">اعتبار کاربر
                                                            خریدار</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12">

                                                </div>
                                            </div>
                                            <div class="card-header">
                                                <h4 class="card-title">ساخت فروش برای کاربر</h4>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        انتخاب کاربر
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label>سرچ بر اساس شماره تلفن</label>
                                                        <select type="text" class="form-control" id="user_select"
                                                            name="userselected">
                                                            @foreach ($users as $item)
                                                                <option creadit_attr="{{ $item->purchasecredit }}"
                                                                    value="{{ $item->id }}">
                                                                    {{ $item->username }}
                                                                </option>
                                                            @endforeach

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        قیمت اصلی کالا
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label>قیمت اصلی کالا را وارد کنید.</label>
                                                        <div class="d-flex align-items-center">

                                                            <input id="main_price" type="text" placeholder="100,000"
                                                                class="form-control moneyInput" id="first_name"
                                                                name="Creditamount" style="margin-left: 4px"> ریال
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        نقدی یا اقساط
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label>سرچ بر اساس شماره تلفن</label>
                                                        <select id="cash_status" type="text" class="form-control"
                                                            name="typeofpayment">
                                                            <option value="cash">نقدی</option>
                                                            <option value="installment">اقساط</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        تعداد اقساط
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <label>تعداد اقساط را انتخاب نمایید</label>
                                                        <select disabled id="payment" type="text" class="form-control"
                                                            name="numberofinstallments">
                                                            <option id="one_month" selected value="1" selected>۱ ماه
                                                            </option>
                                                            <option value="2">۲ ماه</option>
                                                            <option value="3">۳ ماه</option>
                                                            <option value="4">۴ ماه</option>
                                                            <option value="5">۵ ماه</option>
                                                            <option value="6">۶ ماه</option>
                                                            <option value="7">۷ ماه</option>
                                                            <option value="8">۸ ماه</option>
                                                            <option value="9">۹ ماه</option>
                                                            <option value="10">۱۰ ماه</option>
                                                            <option value="11">۱۱ ماه</option>
                                                            <option value="12">۱۲ ماه</option>
                                                            <option value="13">۱۳ ماه</option>
                                                            <option value="14">۱۴ ماه</option>
                                                            <option value="15">۱۵ ماه</option>
                                                            <option value="16">۱۶ ماه</option>
                                                            <option value="17">۱۷ ماه</option>
                                                            <option value="18">۱۸ ماه</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        مبلغ پیش پرداخت
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <div class="d-flex align-items-center">

                                                            <input id="prepayment" readonly type="text"
                                                                class="form-control moneyInput" name="prepaidamount"
                                                                style="margin-left: 4px">
                                                            ریال
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-12 pt-2">
                                                    <h5>
                                                        مبلغ هر قسط
                                                    </h5>
                                                </div>
                                                <div class="col-md-6 col-12">
                                                    <div class="form-group">
                                                        <div class="d-flex align-items-center">

                                                            <input readonly id="each_pay" type="text"
                                                                class="form-control moneyInput" name="amounteachinstallment"
                                                                style="margin-left: 4px">
                                                            ریال
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <button type="button" id="submit_button"
                                                    class="btn btn-primary mr-1 mb-1 waves-effect waves-light">
                                                    تأیید نهایی
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </section>
                @else
                    <section id="main-card" class="card">
                        <div class="card-header m-3 ">
                            <h3 class="text-danger">فروشگاهی برای شما ایجاد نشده است</h3>
                        </div>
                    </section>
                @endisset

                <!-- Description -->


            </div>
        </div>
    </div>
    {{-- <div class="wrapper">
        <a href="#demo-modal">Open Demo Modal</a>
    </div>

    <div id="demo-modal" class="modal open">
        <div class="modal__content">
            <h1>CSS Only Modal</h1>

            <p>
                You can use the :target pseudo-class to create a modals with Zero JavaScript. Enjoy!
            </p>

            <div class="modal__footer">
                Made with <i class="fa fa-heart"></i>, by <a href="https://twitter.com/denicmarko"
                    target="_blank">@denicmarko</a>
            </div>

            <a href="#" class="modal__close">&times;</a>
        </div>  
    </div> --}}

    <style>
        .wrapper {
            height: 100vh;
            /* This part is important for centering the content */
            display: flex;
            align-items: center;
            justify-content: center;
            /* End center */
            background: -webkit-linear-gradient(to right, #834d9b, #d04ed6);
            background: linear-gradient(to right, #834d9b, #d04ed6);
        }

        .wrapper a {
            display: inline-block;
            text-decoration: none;
            padding: 15px;
            background-color: #fff;
            border-radius: 3px;
            text-transform: uppercase;
            color: #585858;
            font-family: 'Roboto', sans-serif;
        }

        .modal {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(77, 77, 77, .7);
            transition: all .4s;
        }

        .modal:target {
            visibility: visible;
            opacity: 1;
        }

        .modal__content {
            border-radius: 4px;
            position: relative;
            width: 500px;
            max-width: 90%;
            background: #fff;
            padding: 1em 2em;
        }

        .modal__footer {
            text-align: right;

            a {
                color: #585858;
            }

            i {
                color: #d02d2c;
            }
        }

        .modal__close {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #585858;
            text-decoration: none;
        }
    </style>
@endsection

@include('back.partials.plugins', ['plugins' => ['jquery.validate']])

@php
    $help_videos = [config('general.video-helpes.users')];
@endphp

@push('scripts')
    <script>
        var user = @json($users);
    </script>
    {{-- <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script> --}}
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
