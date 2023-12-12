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
                                    <li class="breadcrumb-item">همکاران
                                    </li>
                                    <li class="breadcrumb-item active">تراکنش های کیف پول اصلی
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

                        <h4 class="card-title">لیست تراکنش های فروشگاه: {{ $store->nameofstore }}</h4>

                    </div>

                    <div class="card-content">
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div class="">
                                <div id="home" class="container tab-pane "><br>



                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            لیست تراکنش های بانکی </h3>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="g-col-6 g-col-sm-12">
                                            <h4>
                                                مجموعه تراکنش ها
                                            </h4>
                                        </div>
                                        <div class="g-col-6 d-col-sm-12 d-flex align-items-center">
                                            <input id="total_transaction" readonly class="form-control mr-1" type="text"
                                                value="{{ $total }}">
                                            ریال
                                        </div>
                                    </div>
                                    <div class="pc-size">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        تاریخ تراکنش
                                                    </th>
                                                    <th>
                                                        توضیحات
                                                    </th>
                                                    <th>
                                                        مبلغ تراکنش
                                                    </th>
                                                    <th class="text-danger">
                                                        مجموع
                                                    </th>

                                                    <th>
                                                        شماره سند
                                                    </th>
                                                </tr>
                                            </thead>
                                            @php
                                                $counter = 1;
                                            @endphp
                                            <tbody>
                                                @foreach ($trans as $key)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>

                                                            <span class="transaction_datetime">
                                                                {{ \Morilog\Jalali\Jalalian::fromCarbon(\Carbon\Carbon::parse($key->created_at))->format('d-m-Y H:i:s') }}
                                                                <br>
                                                                {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {{ $key->user ? 'تسویه فاکتور آقای: ' . $key->user->username . ' تاریخ: ' . \Morilog\Jalali\Jalalian::fromCarbon(\Carbon\Carbon::parse($key->pre_paid_time))->format('d-m-Y H:i:s') : 'درخواست تسویه' }}
                                                        </td>
                                                        <td>
                                                            <span class="monyInputSpan">{{ $key->price }}</span>
                                                        </td>
                                                        <td class="text-danger">
                                                            <span class="monyInputSpan">{{ $key->finalprice }}</span>

                                                        </td>

                                                        <td>

                                                            {{ $key->documentnumber }}
                                                        </td>

                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mobile-size ">
                                        @foreach ($trans as $key)
                                            <div class=" border rounded mb-1">
                                                <div class="row pt-1">
                                                    <div class="col ml-1">
                                                        <h5 class="text-light">
                                                            تاریخ تراکنش:

                                                        </h5>
                                                    </div>
                                                    <div class="col"><span class="text-dark">
                                                            {{ \Carbon\Carbon::parse($key->datetransaction)->format('Y-m-d') }}
                                                            {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="row pt-1">
                                                    <div class="col ml-1">
                                                        <h5 class="text-light">توضیحات:
                                                        </h5>
                                                    </div>
                                                    <div class="col">
                                                        <span class="text-dark">
                                                            {{ $key->user ? 'تسویه فاکتور آقای: ' . $key->user->username . ' تاریخ: ' . \Morilog\Jalali\Jalalian::fromCarbon(\Carbon\Carbon::parse($key->pre_paid_time))->format('d-m-Y H:i:s') : 'درخواست تسویه' }}

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">
                                                        <h5 class="text-light">مبلغ تراکنش:

                                                        </h5>
                                                    </div>
                                                    <div class="col">

                                                        <span class="monyInputSpan">{{ $key->price }}</span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">

                                                        <h5 class="text-light">مجموع:
                                                        </h5>
                                                    </div>
                                                    <div class="col">

                                                        <span class="monyInputSpan">{{ $key->finalprice }}</span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">

                                                        <h5 class="text-light"> شماره سند:
                                                        </h5>
                                                    </div>

                                                    <div class="col">
                                                        <span class="text-dark">
                                                            {{ $key->documentnumber }} </span>
                                                    </div>

                                                </div>
                                            </div>
                                        @endforeach
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
            </div>

        </div>

        </section>
    </div>

    </div>
    </div>
@endsection

@include('back.partials.plugins', [
    'plugins' => ['persian-datepicker', 'jquery.validate'],
])


@push('scripts')
    <script src="{{ asset('back/assets/js/pages/banktransaction/script.js') }}"></script>

    <script src="{{ asset('back/assets/js/pages/installmentsReport/create.js') }}"></script>
@endpush
