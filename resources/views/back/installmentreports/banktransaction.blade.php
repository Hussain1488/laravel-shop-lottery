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

                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    اسم بانک
                                                </th>
                                                <th>
                                                    مقدار تراکنش
                                                </th>
                                                <th class="text-danger">
                                                    بالانس بانک
                                                </th>
                                                <th>
                                                    تاریخ تراکنش
                                                </th>
                                            </tr>
                                        </thead>
                                        @php
                                            $counter = 1;
                                        @endphp
                                        <tbody>
                                            @foreach ($transaction as $key)
                                                <tr>
                                                    <td>
                                                        {{ $counter++ }}
                                                    </td>
                                                    <td>
                                                        {{ $key->namebank }}
                                                    </td>
                                                    <td>
                                                        {{ $key->transactionprice }}

                                                    </td>
                                                    <td class="text-danger">
                                                        {{ $key->bankbalance }}

                                                    </td>
                                                    <td>
                                                        {{ \Carbon\Carbon::parse($key->transactionsdate)->format('Y/m/d') }}

                                                    </td>

                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                    {{-- @foreach ($transaction as $key)
                                        <div class="border rounded p-2 my-1">
                                            <div class="row grid d-flex justify-content-start">
                                                <div class="">
                                                    <h6>
                                                        اسم بانک: {{ $key->namebank }}
                                                    </h6>
                                                </div>
                                                <div class="">
                                                    <h6>
                                                        مقدار تراکنش: {{ $key->transactionprice }}
                                                    </h6>
                                                </div>
                                                <div class="">
                                                    <h6>
                                                        بالانس بانک : {{ $key->bankbalance }}
                                                    </h6>
                                                </div>
                                                <div class="">
                                                    <h6>
                                                        تاریخ تراکنش :
                                                        {{ \Carbon\Carbon::parse($key->transactionsdate)->format('Y/m/d') }}
                                                    </h6>
                                                </div>

                                            </div>
                                        </div>
                                    @endforeach
 --}}

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
@endpush
