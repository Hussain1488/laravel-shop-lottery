@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->
    @if ($trans->count())
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

                                <div class="row mt-1 ml-2 mb-2 mr-1">
                                    <h6>
                                        لیست تراکنش های بانکی </h6>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-12 d-flex justify-content-between align-items-center">
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
                                    <div class="col-md-6 col-12 d-flex justify-content-end">
                                        <div class=""><input type="button" value="شارژ کیف پول"
                                                class="btn btn-success" id="wallet_recharg_button"></div>

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
    @else
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
    <script src='{{ asset('front/script.js') }}'></script>
@endpush
