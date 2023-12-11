@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->
    {{-- @if ($trans->count()) --}}
    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12">


        <div class="row">




            <div class="col-12">

                <div class="dt-sl">
                    <div class="table-responsive">
                        <div id="home" class="container tab-pane "><br>

                            @if (session('success'))
                                <div class="alert alert-success" role="alert">
                                    {{ session('success') }}
                                </div>
                            @endif
                            @if (session('warning'))
                                <div class="alert alert-warning" role="alert">
                                    {{ session('warning') }}
                                </div>
                            @endif

                            <div class="row mt-1 ml-2 mb-2 mr-1">
                                <h6>
                                    لیست تراکنش اعتباری شما </h6>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 d-flex justify-content-between align-items-center">
                                    <div class="form-group d-flex align-items-center">
                                        <label for="first_name" class="mr-2">
                                            موجودی نقدی کیف پول </label>
                                        <div class="d-flex ">
                                            <input readonly type="text" class="form-control moneyInput" id="first_name"
                                                name="first_name" value="{{ $user->wallet->balance ?? 0 }}"
                                                style="margin-left: 4px"><span> ریال</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 d-flex justify-content-end">
                                    <div class=""><input data-url="{{ route('front.wallet.codeGenerate') }}"
                                            type="button" value="شارژ کیف پول" class="btn btn-success"
                                            id="wallet_recharg_button"></div>

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
                                                    ها مبلغ تراکنش
                                                </h6>
                                            </div>
                                            <div class="col">

                                                <span class="moneyInputSpan">{{ $key->price }}</span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    مجموع تراکنش ها </h6>
                                            </div>
                                            <div class="col">

                                                <span class="transaction_datetime moneyInputSpan ">
                                                    {{ $key->finalprice }}

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
    @if (false)
        <div class="row">
            <div class="col-12">
                <div class="section-title text-sm-title title-wide mb-1 no-after-title-wide dt-sl mb-2 px-res-1">
                    <h2>{{ trans('front::messages.wallet.wallet-history') }}</h2>
                    <a href="{{ route('front.wallet.create') }}"
                        class="m-0 d-block">{{ trans('front::messages.wallet.increase-wallet-inventory') }}</a>
                </div>
            </div>
            <div class="col-12">
                <div class="page dt-sl dt-sn pt-3">
                    <p>{{ trans('front::messages.wallet.there-is-nothing-to-show') }}</p>
                </div>
            </div>
        </div>
    @endif


    <!-- End Content -->
@endsection

@push('scripts')
    <div class="modal fade" id="rechargeForm">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">درخواست تسویه حساب به مبلغ:<span class="text-success"
                            id="deposit_amount_show"></span>ریال
                    </h4>
                </div>
                <hr />

                <!-- Modal body -->
                <div class="modal-body">
                    {{-- <form id="payment_form" action="{{ route('front.wallet.rechargeVarify') }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        <input id="user_id" type="hidden" value="{{ Auth::user()->id }}" name="user_id">
                        <div class="d-flex justify-content-around my-1">
                            <div class="col">
                                <label for="">مقدار واریز:</label>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control moneyInput" name="recharge_amount">
                            </div>
                        </div>
                        <div class="row d-flex justify-center my-1">
                            <div id="validation-messages"></div>

                            <span class="text-danger" style="display: none">لطفا فورم را دقیق پر کرده بعد کلید
                                تأیید را بزنید.</span>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <input type="submit" id="submit_form_pay" class="btn btn-success" value="تأیید">
                            <input type="button" class="btn btn-danger" data-dismiss="modal" value="انصراف">
                        </div>
                    </form> --}}
                    <form id="wallet-create-form" action="{{ route('front.wallet.store') }}" class="setting_form"
                        method="POST">
                        @csrf

                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-8">
                                <div class="form-row-title">
                                    <h6>{{ trans('front::messages.wallet.amount') }}
                                        ({{ trans('front::messages.currency.prefix') }}{{ trans('front::messages.currency.suffix') }})
                                    </h6>
                                </div>
                                <div class="form-row form-group">
                                    <input type="number" class="form-control input-ui pr-2 amount-input" name="amount">
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-8">
                                <div class="form-row-title">
                                    <h6>{{ trans('front::messages.wallet.select-payment-gateway') }}</h6>
                                </div>
                                <div class="form-row form-group">
                                    <select class="form-control py-0 gateway-select" name="gateway" required>
                                        <option class="" value="">
                                            {{ trans('front::messages.wallet.select') }}</option>
                                        @foreach ($gateways as $gateway)
                                            <option class="" value="{{ $gateway->key }}">
                                                {{ $gateway->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="form-row mt-3 justify-content-center">
                            <button id="submit-btn" type="submit" class="btn-primary-cm btn-with-icon ml-2">
                                <i class="mdi mdi-arrow-left"></i>
                                {{ trans('front::messages.wallet.increase-inventory') }}
                            </button>
                        </div>
                    </form>

                </div>

                <!-- Modal footer -->

                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>
    <!-- show Modal -->
    <div class="modal fade" id="smsVarifyModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <span id="code_error" class="alert alert-danger d-none m-2" role="alert">
                </span>


                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"><span class="text-info" id="operation_title1"></span>
                    </h4>
                </div>
                <hr />

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="message-light">
                        {{ trans('front::messages.auth.for-mobile-number') }} {{ $user->username }}
                        {{ trans('front::messages.auth.confirmation-code-sent') }}
                    </div>

                    <form id="code_varification" action="{{ route('front.wallet.sentCode') }}" method="post">
                        @csrf

                        <input name="mobile" type="hidden" value="{{ $user->username }}">
                        <div class="form-row">
                            <div class="numbers-verify form-content form-content1">
                                <input name="verify_code" class="activation-code-input" id='activation-code-input'
                                    placeholder="{{ trans('front::messages.auth.enter-auth-code') }}">
                            </div>
                        </div>
                        <div class="form-row mt-2">
                            <span
                                class="text-primary">{{ trans('front::messages.auth.retrieve-verification-code') }}</span>
                            (<p data-action="#" id="countdown-verify-end"></p>)
                        </div>
                        <div class="form-row mt-3">
                            <button type="button" id="sendCode" class="btn-primary-cm btn-with-icon mx-auto w-100">
                                <i class="mdi mdi-check"></i>
                                {{ trans('front::messages.auth.confirm-mobile-number') }}
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Modal footer -->

                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>
    <script src="{{ theme_asset('js/pages/wallet/index.js') }}"></script>
    <script src="{{ theme_asset('js/pages/wallet/create.js') }}"></script>

    <script src="{{ theme_asset('js/pages/wallet/recharg.js') }}"></script>
    <script src='{{ asset('front/script.js') }}'></script>
@endpush
