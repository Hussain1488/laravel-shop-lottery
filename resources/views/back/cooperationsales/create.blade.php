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
                <!-- Description -->
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
                                                    <div class="d-flex">
                                                        <input id="totalMoney" type="text" placeholder="100,000"
                                                            class="form-control moneyInput" id="first_name"
                                                            name="Creditamount">
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
                                                    <select type="text" class="form-control" name="userselected">
                                                        @foreach ($users as $item)
                                                            <option value="{{ $item->id }}">{{ $item->username }}
                                                            </option>
                                                        @endforeach

                                                    </select>
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
                                                    <input id="prepayment" readonly type="text"
                                                        class="form-control moneyInput" name="prepaidamount">

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
                                                    <input readonly id="each_pay" type="text"
                                                        class="form-control moneyInput" name="amounteachinstallment">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <button type="submit"
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
                <!--/ Description -->

            </div>
        </div>
    </div>
@endsection

@include('back.partials.plugins', ['plugins' => ['jquery.validate']])

@php
    $help_videos = [config('general.video-helpes.users')];
@endphp

@push('scripts')
    {{-- <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script> --}}
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
