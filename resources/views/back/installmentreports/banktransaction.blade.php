@extends('back.layouts.master')

@section('content')
    <div class="app-content content">
        <input type="hidden" value="{{ $id }}" id="bank_data"
            data-action="{{ route('admin.installmentreports.transactionFilter.data') }}">
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
                        <h4 class="card-title">لیست تراکنش های: {{ $title }}</h4>

                    </div>

                    {{-- bank transacion report page --}}



                    <div class="card-content">
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div class="">
                                <div id="home" class="container tab-pane "><br>



                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            {{ $title }} لیست تراکنش های حساب </h3>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="g-col-6 g-col-sm-12 d-flex align-items-center">
                                            <h4>
                                                موجودی حساب
                                            </h4>
                                        </div>
                                        <div class="g-col-6 d-col-sm-12 d-flex align-items-center">
                                            <input id="total_transaction" readonly class="form-control mr-1" type="text"
                                                value="{{ $total }}">
                                            ریال
                                        </div>
                                    </div>

                                    <table class="table table-hover" id="bank_transaction_list">
                                        <thead>

                                        </thead>
                                        {{-- @php
                                            $counter = 1;
                                        @endphp --}}
                                        <tbody>
                                            {{-- @foreach ($transactions as $key)
                                                <tr>
                                                    <td>
                                                        {{ $counter++ }}
                                                    </td>

                                                    <td>
                                                        @if ($key->log)
                                                            {{ $key->storeTransaction->store->nameofstore }}
                                                        @else
                                                            {{ $key->buyerTransaction->user->first_name . ' ' . $key->buyerTransaction->user->last_name }}
                                                        @endif
                                                    </td>
                                                    <td>
                                                        @if ($key->log)
                                                            {{ $key->storeTransaction->store->user->username }}
                                                        @else
                                                            {{ $key->buyerTransaction->user->username }}
                                                        @endif
                                                    </td>
                                                    <td>
                                                        <span class="monyInputSpan">{{ $key->transactionprice }}</span>

                                                    </td>
                                                    <td class="text-danger">
                                                        <span
                                                            class="text-danger">{{ $key->bankbalance < 0 ? '-' : '' }}</span>
                                                        <span class="monyInputSpan">{{ $key->bankbalance }}</span>

                                                    </td>
                                                    <td>
                                                        <span class="transaction_datetime">
                                                            {{ \Carbon\Carbon::parse($key->transactionsdate)->format('Y-m-d') }}
                                                            <br>
                                                            {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                        </span>



                                                    </td>

                                                </tr>
                                            @endforeach --}}
                                        </tbody>
                                    </table>

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
    <script src="{{ asset('back/assets/datatable/datatables.min.js') }}"></script>
    <script src="{{ asset('back/assets/js/pages/installmentsReport/create.js') }}"></script>
@endpush
