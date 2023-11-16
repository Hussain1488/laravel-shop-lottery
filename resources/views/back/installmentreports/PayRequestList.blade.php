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
                        <h4 class="card-title">لیست درخواست های تسویه حساب</h4>

                    </div>




                    <div class="card-content">
                        <div class="container mt-3">

                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link  active" style="font-size: 10px" data-toggle="tab" href="#home">
                                        درخواست های پرداخت نشده </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " style="font-size: 10px" data-toggle="tab" href="#menu1">درخواست
                                        های
                                        پرداخت
                                        شده</a>
                                </li>

                            </ul>

                            <!-- Tab panes -->
                            <div class="tab-content">

                                {{-- not validated and not paid prepayment of installments list --}}
                                <div id="home" class="container tab-pane active"><br>




                                    <div class="row mb-2">
                                        <div class="g-col-6 g-col-sm-12 d-flex align-items-center">
                                            <h4>
                                                مجموعه درخواست ها:
                                            </h4>
                                        </div>
                                        <div class="g-col-6 d-col-sm-12 d-flex align-items-center">
                                            <input id="total_transaction" readonly class="form-control mr-1 moneyInput"
                                                type="text" value="{{ $total[0] }}">
                                            ریال
                                        </div>
                                    </div>
                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            درخواست های تسویه نشده:
                                        </h3>
                                    </div>

                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    نام فروشگاه
                                                </th>
                                                <th>
                                                    مبلغ درخواست(ریال)
                                                </th>
                                                <th class="">
                                                    مجموع درخواست ها (ریال)
                                                </th>
                                                <th>
                                                    تاریخ درخواست
                                                </th>
                                                <th>
                                                    شماره درخواست
                                                </th>
                                                <th>
                                                    عملیات
                                                </th>
                                            </tr>
                                        </thead>
                                        @php
                                            $counter = 1;
                                        @endphp
                                        <tbody>
                                            @foreach ($transaction as $key)
                                                @if ($key->status == 0)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>

                                                            <a
                                                                href="{{ route('admin.createcolleague.show', [$key->store->id]) }}">
                                                                {{ $key->store->nameofstore }}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <span class="monyInputSpan">{{ $key->depositamount }}</span>

                                                        </td>
                                                        <td class="text-success">
                                                            +<span class="monyInputSpan">{{ $key->final_price }}</span>

                                                        </td>
                                                        <td>
                                                            <span class="transaction_datetime">
                                                                {{ \Carbon\Carbon::parse($key->depositdate)->format('Y-m-d') }}
                                                                <br>
                                                                {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                            </span>

                                                        </td>
                                                        <td>
                                                            {{ $key->list_id }}
                                                        </td>
                                                        <td>
                                                            <button data-id="{{ $key->id }}"
                                                                data-amount="{{ $key->depositamount }}"
                                                                class="btn btn-success pay_button">پرداخت</button>
                                                        </td>

                                                    </tr>
                                                @endif
                                            @endforeach
                                        </tbody>
                                    </table>




                                </div>
                                {{--  not payd installments which are paid prepayment of isntallments list --}}
                                <div id="menu1" class="container tab-pane fade"><br>





                                    <div class="row mb-2">
                                        <div class="g-col-6 g-col-sm-12 d-flex align-items-center">
                                            <h4>
                                                مجموعه درخواست ها:
                                            </h4>
                                        </div>
                                        <div class="g-col-6 d-col-sm-12 d-flex align-items-center">
                                            <input id="total_transaction" readonly class="form-control mr-1 moneyInput"
                                                type="text" value="{{ $total[1] }}">
                                            ریال
                                        </div>
                                    </div>
                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            درخواست های تسویه شده:
                                        </h3>
                                    </div>

                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    نام فروشگاه
                                                </th>
                                                <th>
                                                    مبلغ درخواست(ریال)
                                                </th>
                                                <th class="">
                                                    مجموع درخواست ها (ریال)
                                                </th>
                                                <th>
                                                    تاریخ درخواست
                                                </th>
                                                <th>
                                                    شماره درخواست
                                                </th>
                                                {{-- <th>
                                                    عملیات
                                                </th> --}}
                                            </tr>
                                        </thead>
                                        @php
                                            $counter = 1;
                                        @endphp
                                        <tbody>
                                            @foreach ($transaction as $key)
                                                @if ($key->status == 1)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>
                                                            <a
                                                                href="{{ route('admin.createcolleague.show', [$key->store->id]) }}">
                                                                {{ $key->store->nameofstore }}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <span class="monyInputSpan">{{ $key->depositamount }}</span>

                                                        </td>
                                                        <td class="text-success">
                                                            +<span class="monyInputSpan">{{ $key->final_price }}</span>

                                                        </td>
                                                        <td>
                                                            {{ \Carbon\Carbon::parse($key->depositdate)->format('Y/m/d') }}

                                                        </td>
                                                        <td>
                                                            {{ $key->list_id }}
                                                        </td>
                                                        {{-- <td>
                                                            <a href="#"><i class="feather icon-pay"></i></a>
                                                        </td> --}}

                                                    </tr>
                                                @endif
                                            @endforeach
                                        </tbody>
                                    </table>
                                    {{-- <a data-toggle="modal" href="#myModal">Open Modal</a> --}}




                                </div>

                            </div>
                        </div>

                    </div>

                </section>
                <!-- Vertically centered modal -->
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">درخواست تسویه حساب به مبلغ:<span class="text-success"
                                        id="deposit_amount_show"></span>ریال
                                </h4>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <form id="payment_form" action="{{ '#' }}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <input id="pay_list_id" type="hidden" value="" name="pay_list_id">
                                    <div class="d-flex justify-content-around my-1">
                                        <div class="col">
                                            <label for="">شماره پیگیری:</label>
                                        </div>
                                        <div class="col">
                                            <input required type="number" class="form-control" name="Issuetracking">
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-around my-1">
                                        <div class="col d-flex align-items-center">
                                            <label for="">:نام بانک</label>
                                        </div>
                                        <div class="form-group col">
                                            <label></label>
                                            <select id="bank_list" type="text" class="form-control" name="nameofbank">
                                                @isset($bank)
                                                    <option value="">انتخاب بانک</option>
                                                    @foreach ($bank as $key)
                                                        <option value="{{ $key->id }}">{{ $key->accountnumber }}
                                                        </option>
                                                    @endforeach
                                                @else
                                                    <option value="">گزینه ای برای انتخاب وجود ندارد</option>
                                                @endisset

                                            </select>

                                        </div>

                                    </div>
                                    <div class="d-flex justify-content-around my-1">
                                        <div class="col">
                                            <label for="">ارسال سند:</label>
                                        </div>
                                        <div class="col">
                                            <input required id="issue_doc" type="file" class="form-control"
                                                name="documentpayment">
                                        </div>
                                    </div>
                                    <div class="row d-flex justify-center my-1">
                                        <div id="validation-messages"></div>

                                        <span class="text-danger" style="display: none">لطفا فورم را دقیق پر کرده بعد کلید
                                            تأیید را بزنید.</span>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-between">
                                        <input type="button" id="submit_form_pay" class="btn btn-success"
                                            value="تأیید">
                                        <input type="button" class="btn btn-danger" data-dismiss="modal"
                                            value="انصراف">
                                    </div>
                                </form>

                            </div>

                            <!-- Modal footer -->

                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
@endsection
@include('back.partials.plugins', ['plugins' => ['jquery.validate']])

@push('scripts')
    <script>
        var pay_url = "{{ route('admin.installmentreports.RequestPaymentStore') }}"
    </script>

    <script src="{{ asset('back/assets/js/pages/installmentsReport/create.js') }}"></script>
@endpush
