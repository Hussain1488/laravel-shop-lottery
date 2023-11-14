@extends('front::layouts.master')

@section('content')
    <!-- Start Content -->


    <main class="main-content dt-sl mt-4 mb-3">
        <div class="container main-container">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">


                    <div class="row">
                        <div class=" page col-12">
                            <div class="section-title text-sm-title title-wide mb-1 no-after-title-wide dt-sl mb-2 px-res-1">
                                <h2>{{ trans('front::messages.wallet.wallet-history') }}</h2>
                                <a href="{{ route('front.wallet.create') }}"
                                    class="m-0 d-block">{{ trans('front::messages.wallet.increase-wallet-inventory') }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="page dt-sl dt-sn pt-3">
                                <div class="content-body">
                                    <section class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">اسم کاربر</h4>
                                        </div>
                                        <div class="card-content">
                                            <div class="container mt-3">

                                                @if (session('warning'))
                                                    <div class="alert alert-danger" role="alert">
                                                        {{ session('warning') }}
                                                    </div>
                                                @endif
                                                @if (session('success'))
                                                    <div class="alert alert-success" role="alert">
                                                        {{ session('success') }}
                                                    </div>
                                                @endif
                                                <!-- Nav tabs -->
                                                <ul class="nav nav-tabs">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" style="font-size: .625rem"
                                                            data-toggle="tab" href="#home">در
                                                            انتظار تأیید</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" style="font-size: .625rem" data-toggle="tab"
                                                            href="#menu1">اقساط
                                                            پرداخت
                                                            نشده</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" style="font-size: .625rem" data-toggle="tab"
                                                            href="#menu2">اقساط
                                                            پرداخت
                                                            شده</a>
                                                    </li>

                                                </ul>


                                                <!-- Tab panes -->
                                                <div class="tab-content">
                                                    <div id="home" class="container tab-pane active my-2 py-3"><br>
                                                        <div class="row">

                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        مقدار اعتبار خرید اقساطی
                                                                    </label>
                                                                    <div class="d-flex">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput" id="first_name"
                                                                            name="first_name"
                                                                            value="{{ $user->purchasecredit != null ? $user->purchasecredit : 0 }}">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">

                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 col-12 d-flex justify-content-between">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        موجودی نقدی کیف پول </label>
                                                                    <div class="d-flex ">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput" id="first_name"
                                                                            name="first_name"
                                                                            value="{{ $user->inventory != null ? $user->inventory : 0 }}"
                                                                            style="margin-left: 4px"><span> ریال</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12 d-flex justify-content-end">
                                                                <div class=""><input type="button"
                                                                        value="شارژ کیف پول" class="btn btn-success"
                                                                        id="wallet_recharg_button"></div>

                                                            </div>
                                                        </div>
                                                        @foreach ($installmentsm as $key)
                                                            @if ($key->statususer == 0 && $key->paymentstatus == 0)
                                                                <div class="border rounded p-2 my-2">
                                                                    <div class="row text-center"
                                                                        style="flex-direction: column;">
                                                                        <h5>
                                                                            {{ $key->user->username }}
                                                                        </h5>
                                                                    </div>

                                                                    <div class="row my-1">
                                                                        <div class="col">
                                                                            {{ $key->numberofinstallments }} عدد به
                                                                            مبلغ قسط <span class="moneyInputSpan">
                                                                                {{ $key->Creditamount }} </span> ریال
                                                                        </div>

                                                                    </div>

                                                                    <div class="row px-3">

                                                                        <div class="">

                                                                            مقدار پیش پرداخت: <span class="moneyInputSpan">
                                                                                {{ $key->prepaidamount }} </span> ریال
                                                                        </div>
                                                                        <div class="col d-flex justify-content-end">

                                                                            <a href="{{ route('front.installments.usrestatus.refuse', [$key->id]) }}"
                                                                                class="btn btn-warning ml-1"
                                                                                style="">انصراف</a>
                                                                            <a href="{{ route('front.installments.usrestatus.edit', [$key->id]) }}"
                                                                                class="btn btn-success"
                                                                                style="">پرداخت</a>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            @endif
                                                        @endforeach


                                                    </div>

                                                    <div id="menu1" class="container tab-pane fade"><br>
                                                        <div class="row">

                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        مقدار اعتبار خرید اقساطی
                                                                    </label>
                                                                    <div class="d-flex">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput" id="first_name"
                                                                            name="first_name"
                                                                            value="{{ $user->purchasecredit != null ? $user->purchasecredit : 0 }}">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">

                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        موجودی نقدی کیف پول </label>
                                                                    <div class="d-flex ">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput"
                                                                            id="first_name" name="first_name"
                                                                            value="{{ $user->inventory != null ? $user->inventory : 0 }}">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">

                                                            </div>
                                                        </div>
                                                        {{-- @foreach ($installmentsm as $key)
                                                @if ($key->statususer == 1)
                                                    <div class="border rounded p-2 my-1">
                                                        <div class="row text-center " style="flex-direction: column;">
                                                            <h5>
                                                                {{ $key->user->username }} </h5>
                                                        </div>

                                                        <div class="row my-1">
                                                            <div class="col-5">
                                                                1402/2/2
                                                            </div>
                                                            <div class="col-7">
                                                                مبلغ قسط {{ $key->Creditamount }} ریال
                                                            </div>

                                                        </div>

                                                        <div class="row m-2">
                                                            مقدار جریمه دیر کرد ۰ ریال
                                                        </div>

                                                        <div class="row m-2">
                                                            وضعیت: پرداخت شده در تاریخ ۱۴۰۲/۸/۲۵
                                                        </div>
                                                        <div class="row px-3">

                                                            <div class="col d-flex justify-content-center">
                                                                <a href="{{ route('front.installments.usrestatus.refuse', [$key->id]) }}"
                                                                    class="btn btn-warning" style="">انصراف</a>
                                                            </div>
                                                            <div class="col d-flex justify-content-center">
                                                                <a href="{{ route('front.installments.usrestatus.pay', [$key->id]) }}"
                                                                    class="btn btn-success" style="">پرداخت</a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                @endif
                                            @endforeach --}}
                                                        @foreach ($installmentsm as $value)
                                                            @if ($value->statususer == 1)
                                                                @foreach ($value->installments as $key)
                                                                    @if ($key->paymentstatus == 0)
                                                                        <div class="border rounded p-2 my-1">
                                                                            <div class="row text-center "
                                                                                style="flex-direction: column;">
                                                                                <h5>
                                                                                    اقساط فروشگاه:

                                                                                    {{ $value->store->nameofstore != '' ? $value->store->nameofstore : '...' }}
                                                                                </h5>
                                                                            </div>

                                                                            <div class="row mr-2">

                                                                                مبلغ کل قسط: <span class="moneyInputSpan">
                                                                                    {{ $value->Creditamount }} </span> ریال
                                                                            </div>

                                                                            <div class="row m-2">
                                                                                مقدار جریمه دیر کرد ۰ ریال
                                                                            </div>
                                                                            <div class="row mr-2">

                                                                                مبلغ هر قسط: <span class="moneyInputSpan">
                                                                                    {{ $key->installmentprice }} </span>
                                                                                ریال
                                                                            </div>

                                                                            <div
                                                                                class="row my-1 mx-2 p-1 d-flex justify-content-between">

                                                                                <div>

                                                                                    <div class="row m-2">
                                                                                        قسط شماره
                                                                                        {{ $key->installmentnumber }} به
                                                                                        سر
                                                                                        رسید تاریخ:
                                                                                        {{ \Carbon\Carbon::parse($key->duedate)->format('Y/m/d') }}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="">


                                                                                    <a href="{{ route('front.installments.paymentStatus.edit', ['id1' => $key->id, 'id2' => $value->id]) }}"
                                                                                        class="btn btn-info btn-sm"
                                                                                        style="">پرداخت</a>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    @endif
                                                                @endforeach
                                                            @endif
                                                        @endforeach

                                                    </div>
                                                    <div id="menu2" class="container tab-pane fade"><br>
                                                        <div class="row">

                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        مقدار اعتبار خرید اقساطی
                                                                    </label>
                                                                    <div class="d-flex">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput"
                                                                            id="first_name" name="first_name"
                                                                            value="{{ $user->purchasecredit != null ? $user->purchasecredit : 0 }}">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">

                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 col-12">
                                                                <div class="form-group d-flex align-items-center">
                                                                    <label for="first_name" class="mr-2">
                                                                        موجودی نقدی کیف پول </label>
                                                                    <div class="d-flex ">
                                                                        <input readonly type="text"
                                                                            class="form-control moneyInput"
                                                                            id="first_name" name="first_name"
                                                                            value="{{ $user->inventory != null ? $user->inventory : 0 }}">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 col-12">

                                                            </div>
                                                        </div>
                                                        @foreach ($installmentsm as $value)
                                                            @if ($value->paymentstatus == 1)
                                                                @foreach ($value->installments as $key)
                                                                    @if ($key->paymentstatus == 1)
                                                                        <div class="border rounded p-2 my-1">
                                                                            <div class="row text-center "
                                                                                style="flex-direction: column;">
                                                                                <h5>
                                                                                    اقساط فروشگاه:
                                                                                    {{ $value->store->nameofstore != '' ? $value->store->nameofstore : '...' }}
                                                                                </h5>
                                                                            </div>

                                                                            <div class="row mr-2">

                                                                                مبلغ کل قسط <span class="moneyInputSpan">
                                                                                    {{ $value->Creditamount }} </span> ریال

                                                                            </div>

                                                                            <div class="row m-2">
                                                                                مقدار جریمه دیر کرد ۰ ریال
                                                                            </div>
                                                                            <div>

                                                                            </div>

                                                                            <div class="row m-2">
                                                                                وضعیت: پرداخت شده در تاریخ ۱۴۰۲/۸/۲۵
                                                                            </div>
                                                                            <div class="row mr-2">

                                                                                مبلغ هر قسط: <span class="moneyInputSpan">
                                                                                    {{ $key->installmentprice }} </span>
                                                                                ریال
                                                                            </div>
                                                                            <div
                                                                                class="row my-1 mx-2 p-1 d-flex justify-content-between">

                                                                                <div>

                                                                                    <div class="row m-2">
                                                                                        قسط شماره
                                                                                        {{ $key->installmentnumber }} به
                                                                                        سر
                                                                                        رسید تاریخ:
                                                                                        {{ \Carbon\Carbon::parse($key->duedate)->format('Y/m/d') }}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="">


                                                                                    {{-- <a href="{{ route('front.installments.usrestatus.pay', [$key->id]) }}"
                                                                        class="btn btn-info btn-sm"
                                                                        style="">پرداخت</a> --}}
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    @endif
                                                                @endforeach
                                                            @endif
                                                        @endforeach

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </section>


                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </main>

    <!-- End Content -->
@endsection
@include('back.partials.plugins', ['plugins' => ['jquery.validate']])
@include('front::user.installments.recharge_modal')
@push('scripts')
    <!-- show Modal -->
    <div class="modal fade" id="my-modal">
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
                    <form id="payment_form" action="{{ route('front.wallet.recharge') }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        <input id="user_id" type="hidden" value="{{ Auth::user()->id }}" name="user_id">
                        <div class="d-flex justify-content-around my-1">
                            <div class="col">
                                <label for="">مقدار واریز:</label>
                            </div>
                            <div class="col">
                                <input required type="number" class="form-control moneyInput" name="recharge_amount">
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
                    </form>

                </div>

                <!-- Modal footer -->

                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>


    <script>
        $('refuse_button').on('click', function() {
            $('#history-show-modal').modal('show');

        });
    </script>


    <script src="{{ theme_asset('js/pages/installments/index.js') }}"></script>
    <script src='{{ asset('front/script.js') }}'></script>
@endpush
