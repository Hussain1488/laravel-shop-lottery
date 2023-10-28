@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->



    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12">


        <div class="row">

            {{-- <div class="col-lg-12 text-center">
                <div class="alert alert-success mt-4" role="alert">
                    <strong>{{ trans('front::messages.wallet.inventory-increase-successful') }}</strong>.
                </div>
            </div>

            <div class="col-lg-12 text-center">
                <div class="alert alert-danger mt-4" role="alert">
                    <strong>{{ session('transaction-error') }}</strong>.
                </div>
            </div> --}}


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

                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" style="font-size: .625rem" data-toggle="tab"
                                                href="#home">در
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
                                                            <input readonly type="text" class="form-control moneyInput"
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
                                                            <input readonly type="text" class="form-control moneyInput"
                                                                id="first_name" name="first_name"
                                                                value="{{ $user->inventory != null ? $user->inventory : 0 }}"
                                                                style="margin-left: 4px"><span> ریال</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12">

                                                </div>
                                            </div>
                                            @foreach ($installmentsm as $key)
                                                @if ($key->statususer == 0 && $key->paymentstatus == 0)
                                                    <div class="border rounded p-2 my-2">
                                                        <div class="row text-center" style="flex-direction: column;">
                                                            <h5>
                                                                {{ $key->user->username }}
                                                            </h5>
                                                        </div>

                                                        <div class="row my-1">
                                                            <div class="col">
                                                                {{ $key->numberofinstallments }} عدد قسط به سر رسید ۲۵ هر
                                                                ماه به
                                                                مبلغ قسط {{ $key->Creditamount }} ریال
                                                            </div>

                                                        </div>

                                                        <div class="row px-3">

                                                            <div class="">

                                                                مقدار پیش پرداخت: {{ $key->prepaidamount }} ریال
                                                            </div>
                                                            <div class="col d-flex justify-content-end">
                                                                <a href="{{ route('front.installments.usrestatus.edit', [$key->id]) }}"
                                                                    class="btn btn-success" style="">پرداخت</a>
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
                                                            <input readonly type="text" class="form-control moneyInput"
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
                                                            <input readonly type="text" class="form-control moneyInput"
                                                                id="first_name" name="first_name"
                                                                value="{{ $user->inventory != null ? $user->inventory : 0 }}">
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12">

                                                </div>
                                            </div>
                                            @foreach ($installmentsm as $key)
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
                                                            <input readonly type="text" class="form-control moneyInput"
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
                                                            <input readonly type="text" class="form-control moneyInput"
                                                                id="first_name" name="first_name"
                                                                value="{{ $user->inventory != null ? $user->inventory : 0 }}">
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-12">

                                                </div>
                                            </div>
                                            @foreach ($installmentsm as $key)
                                                @if ($key->paymentstatus == 1)
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


        <div class="mt-3">
            {{-- {{ $histories->links('front::components.paginate') }} --}}
        </div>

    </div>
    <!-- End Content -->
@endsection

@push('scripts')
    <!-- show Modal -->
    <div class="modal fade" id="history-show-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel21">{{ trans('front::messages.wallet.transaction-details') }}
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="history-detail" class="modal-body">


                </div>
            </div>
        </div>
    </div>

    <script src="{{ theme_asset('js/pages/wallet/index.js') }}"></script>
@endpush
