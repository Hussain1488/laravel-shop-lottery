@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->

    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12">


        <div class="row">




            <div class="col-12">

                <div class="dt-sl">
                    <div class="table-responsive">
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
                                        value="">
                                    ریال
                                </div>
                            </div>

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
                                            مجموع تراکنش با کسر کارمزد
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
                                                {{ \Carbon\Carbon::parse($key->datetransaction)->format('Y/m/d') }}
                                            </td>
                                            <td>
                                                {{ $key->flag == 1 ? 'درخواست برداشت از کیف پول اصلی' : ($key->flag == 0 ? 'درخواست واریز' : 'فروش پرداخت شده') }}
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
                    </div>
                </div>
            </div>
        </div>




    </div>



    <!-- End Content -->
@endsection
