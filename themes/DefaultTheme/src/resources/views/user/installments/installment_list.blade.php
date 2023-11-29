@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->

    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12">


        <div class="row">




            <div class="col-12">

                <div class="dt-sl">
                    <div class="table-responsive">
                        <div id="home" class="container tab-pane "><br>



                            <div class="row mt-1 ml-2 mb-2 mr-1">
                                <h5>
                                    لیست تراکنش های بانکی </h5>
                            </div>
                            <div class="row m-2 mb-3">
                                <div class="g-col-6 g-col-sm-12 d-flex align-items-center">
                                    <h6>
                                        اعتبار شما:
                                    </h6>
                                </div>
                                <div class="g-col-6 d-col-sm-12 d-flex align-items-center">
                                    <input id="total_transaction" readonly class="form-control mr-1 moneyInput"
                                        type="text" value="{{ $credit }}">
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
                                            <th class="text-danger">
                                                مجموع تراکنش ها
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
                                                        {{ \Carbon\Carbon::parse($key->datetransaction)->format('Y-m-d') }}
                                                        <br>
                                                        {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                    </span>
                                                </td>
                                                <td>
                                                    {{ $key->flag == 1 ? 'درخواست برداشت از کیف پول اصلی' : ($key->flag == 0 ? 'درخواست واریز' : 'فروش پرداخت شده') }}
                                                </td>
                                                <td>
                                                    <span class="moneyInputSpan">{{ $key->price }}</span>
                                                </td>
                                                <td class="text-danger">
                                                    <span class="moneyInputSpan">{{ $key->finalprice }}</span>

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
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    تاریخ تراکنش:

                                                </h6>
                                            </div>
                                            <div class="col">
                                                <span class="transaction_datetime">
                                                    {{ \Carbon\Carbon::parse($key->datetransaction)->format('Y-m-d') }}
                                                    <br>
                                                    {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    نوع تراکنش: </h6>
                                            </div>
                                            <div class="col">
                                                <span class="text-dark">
                                                    {{ $key->flag == 1 ? 'درخواست برداشت از کیف پول اصلی' : ($key->flag == 0 ? 'درخواست واریز' : 'فروش پرداخت شده') }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    مبلغ تراکنش
                                                </h6>
                                            </div>
                                            <div class="col">

                                                <span class="moneyInputSpan">{{ $key->price }}</span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    مجموع تراکنش </h6>
                                            </div>
                                            <div class="col">

                                                <span class="transaction_datetime">
                                                    <span class="moneyInputSpan">{{ $key->finalprice }}</span>

                                                </span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    شماره سند </h6>
                                            </div>

                                            <div class="col">
                                                <span class="text-dark">
                                                    {{ $key->documentnumber }}</span>
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



    <!-- End Content -->
@endsection

@push('scripts')
    <script src="{{ theme_asset('js/pages/installments/index.js') }}"></script>

    <script src='{{ asset('front/script.js') }}'></script>
@endpush
