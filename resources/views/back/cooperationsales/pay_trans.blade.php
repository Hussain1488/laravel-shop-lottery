@extends('back.layouts.master')

@section('content')
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">

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
                                                        نوع تراکنش
                                                    </th>
                                                    <th>
                                                        مبلغ تراکنش
                                                    </th>
                                                    <th>
                                                        مجموع تراکنش
                                                    </th>
                                                    <th class="">
                                                        شماره شبا
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
                                                                {{ \Carbon\Carbon::parse($key->depositdate)->format('Y-m-d') }}
                                                                <br>
                                                                {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {{ 'درخواست واریز' }}
                                                        </td>
                                                        <td>
                                                            <span class="monyInputSpan">{{ $key->depositamount }}</span>
                                                        </td>
                                                        <td>
                                                            <span class="monyInputSpan">{{ $key->final_price }}</span>
                                                        </td>
                                                        <td class="text-danger">
                                                            <span class="">{{ $key->shabanumber }}</span>

                                                        </td>
                                                        <td>
                                                            {{ $key->list_id }}
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
                                                            {{ \Carbon\Carbon::parse($key->depositdate)->format('Y-m-d') }}
                                                            {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="row pt-1">
                                                    <div class="col ml-1">
                                                        <h5 class="text-light">نوع تراکنش:
                                                        </h5>
                                                    </div>
                                                    <div class="col">
                                                        <span class="text-dark">
                                                            {{ 'درخواست واریز' }}

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">
                                                        <h5 class="text-light">مبلغ تراکنش:

                                                        </h5>
                                                    </div>
                                                    <div class="col">

                                                        <span class="monyInputSpan">{{ $key->depositamount }}</span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">

                                                        <h5 class="text-light">شماره شبا:
                                                        </h5>
                                                    </div>
                                                    <div class="col">

                                                        <span class="monyInputSpan">{{ $key->final_price }}</span>
                                                    </div>
                                                </div>
                                                <div class="row pt-1">
                                                    <div class="col ml-1">

                                                        <h5 class="text-light"> شماره سند:
                                                        </h5>
                                                    </div>

                                                    <div class="col">
                                                        <span class="text-dark">
                                                            {{ $key->list_id }} </span>
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
