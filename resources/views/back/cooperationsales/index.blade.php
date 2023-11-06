@extends('back.layouts.master')

@section('content')
    <input type="hidden" id="new_date" value="{{ \Carbon\Carbon::parse($today)->format('Y-m-d') }}">
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
                                    <a class="nav-link" style="font-size: 10px" data-toggle="tab" href="#menu1">
                                        فروش های انجام شده
                                    </a>
                                </li>

                            </ul>

                            <!-- Tab not paid and not validated installments -->
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
                                                        {{ $key->numberofinstallments }} عدد قسط به مبلغ هر قسط
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


                                </div>

                                {{-- tab prepayment paid and validated installments --}}
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
                                            @if ($index->statususer == 1 && $index->status == 0)
                                                @php
                                                    $updated_date = \Carbon\Carbon::parse($index->datepayment);
                                                @endphp
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
                                                        تعداد {{ $key->numberofinstallments }} قسط به سر رسید تاریخ
                                                        ({{ \Carbon\Carbon::parse($index->datepayment)->format('d') }})
                                                        هر ماه
                                                        به مبلغ قسط
                                                        {{ $key->amounteachinstallment }} ریال
                                                    </div>

                                                    <div class="row ">

                                                        مقدار پیش پرداخت {{ $index->prepaidamount }} ریال

                                                    </div>
                                                    {{ $index->store->id }} <br />{{ $index->id }}
                                                    <div class="row d-flex justify-content-between p-1">
                                                        <div class="col d-flex justify-content-end">
                                                            <button
                                                                data_date='{{ \Carbon\Carbon::parse($index->CarbonDate)->format('Y-m-d') }}'
                                                                data_day='{{ $index->store->settlementtime }}'
                                                                class="btn btn-primary settlementtime_button"
                                                                id="settlementtime_button" data-store-id ="{{ $index->id }}"
                                                                data-route="{{ route('admin.installments.payrequest', ['store_id' => $index->store->id, 'installments_id' => $index->id]) }}">
                                                                درخواست تسویه حساب
                                                            </button>
                                                        </div>



                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @endempty

                                </div>

                                {{-- tab installments paid records --}}
                                {{-- <div id="menu2" class="container tab-pane fade"><br>

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
                                                            ({{ \Carbon\Carbon::parse($key->duedate)->format('d') }})
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

                                </div> --}}
                            </div>
                        </div>

                    </div>

            </div>
            </section>
            <div class="container" dir="rtl">
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title text-danger">هشدار!</h4>
                            </div>
                            <div class="modal-body">
                                <p>
                                    برای فعلا شما اجازه درخواست تسویه را ندارید.
                                </p>
                                <p>این کاربر <span id="user_day_time" class="text-success"></span> روز دیگر وقت دارد.</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <button type="button" class="btn btn-default text-danger"
                                    data-dismiss="modal">بستن</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
    <style>
        .modal a.close-modal[class*="icon-"] {
            direction: rtl;
            top: -10px;
            right: -10px;
            width: 20px;
            height: 20px;
            color: #fff;
            line-height: 1.25;
            text-align: center;
            text-decoration: none;
            text-indent: 0;
            background: #900;
            border: 2px solid #fff;
            -webkit-border-radius: 26px;
            -moz-border-radius: 26px;
            -o-border-radius: 26px;
            -ms-border-radius: 26px;
            -moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }
    </style>
@endsection

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
