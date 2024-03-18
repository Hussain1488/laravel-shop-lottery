@extends('front::user.layouts.master')

@section('user-content')
    <!-- Start Content -->
    {{-- @if ($trans->count()) --}}
    <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12">


        <div class="row">


            <div class="col-12">

                <div class="dt-sl">
                    <div class="table-responsive">

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

                        <div class="row mt-1 ml-2 mb-2 mr-1 d-flex justify-content-around">
                            <div class="col">

                                <h6>
                                    قرعه کشی!
                                </h6>
                            </div>
                            <div class="col">
                                <h6>
                                    <div class="logo-area  mr-2 d-flex justify-content-end">
                                        <button type="button" href="{{ route('front.index') }}"
                                            class="border-0 bg-none lottery_code_button">
                                            <img data-src="{{ theme_asset('img/ghorekeshi.png') }}"
                                                style="width: 100%;height: auto;
    "
                                                alt="{{ option('info_site_title', 'خانه اقساط') }}">
                                        </button>
                                    </div>
                                </h6>
                            </div>
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link {{ request('tab') != 'winner' && request('tab') != 'invoice' ? 'active' : '' }}"
                                    style="font-size: .625rem" data-toggle="tab" href="#lotteryCodes">
                                    کد های قرعه کشی شما</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link {{ request('tab') == 'invoice' ? 'active' : '' }}"
                                    style="font-size: .625rem" data-toggle="tab" href="#invoices">
                                    فاکتور های خرید شما
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link {{ request('tab') == 'winner' ? 'active' : '' }}"
                                    style="font-size: .625rem" data-toggle="tab" href="#winners">
                                    لیست برنده ها
                                </a>
                            </li>


                        </ul>
                        <div class="tab-content ">
                            <div id="lotteryCodes"
                                class="container tab-pane {{ request('tab') != 'winner' && request('tab') != 'invoice' ? 'active' : 'fade' }} my-2 py-3">


                                <div class="row">
                                    <div class="col-md-6 col-12 d-flex justify-content-between align-items-center">
                                        <div class="form-group d-flex align-items-center">
                                            <label for="first_name" class="mr-2">
                                                کد های قرعه کشی شما
                                            </label>
                                            <div class="d-flex ">
                                                {{-- <input readonly type="text" class="form-control moneyInput" id="first_name"
                                                name="first_name" value="{{ $user->wallet->balance ?? 0 }}"
                                                style="margin-left: 4px"><span> ریال</span> --}}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                @if ($lottery->count() > 0)
                                    <div class="pc-size" data-screen="pc">

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        کد قرعه کشی
                                                    </th>
                                                    <th>
                                                        تاریخ دریافت
                                                    </th>
                                                    <th>
                                                        منبع
                                                    </th>
                                                    <th>
                                                        وضعیت
                                                    </th>
                                                    <th>
                                                        قرعه کشی هفته گی
                                                    </th>
                                                    <th>
                                                        قرعه کشی ماهانه
                                                    </th>
                                                    <th>
                                                        قرعه کشی سالانه
                                                    </th>
                                                </tr>
                                            </thead>
                                            @php
                                                $counter = ($lottery->currentPage() - 1) * $lottery->perPage() + 1;
                                            @endphp
                                            <tbody>
                                                @foreach ($lottery as $key)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>
                                                            {{ $key->code }}
                                                        </td>
                                                        <td>
                                                            {{ jDate($key->created_at)->format('Y-m-d') }}
                                                        </td>
                                                        <td>

                                                            @if ($key->daily_code)
                                                                <span class="badge bg-success text-white">کد
                                                                    روزانه</span>
                                                            @else
                                                                <span class="badge bg-info">فاکتور خرید</span>
                                                            @endif

                                                        </td>
                                                        <td>
                                                            @if ($key->state == 'wait')
                                                                <span class="badge badge-success">فعال</span>
                                                            @elseif($key->state == 'won')
                                                                <span class="badge badge-primary">یک دور برنده</span>
                                                            @else
                                                                <span class="badge badge-danger">غیر فعال</span>
                                                            @endif
                                                        </td>
                                                        <td>
                                                            @if (!$key->weekly_state)
                                                                <span class="badge badge-warning">
                                                                    در انتظار
                                                                </span>
                                                            @else
                                                                <span class="badge badge-danger">
                                                                    منقضی
                                                                </span>
                                                            @endif
                                                        </td>
                                                        <td class="text-danger">
                                                            @if (!$key->monthly_state)
                                                                <span class="badge badge-warning">
                                                                    در انتظار
                                                                </span>
                                                            @else
                                                                <span class="badge badge-danger">
                                                                    منقضی
                                                                </span>
                                                            @endif
                                                        </td>
                                                        <td>
                                                            <span class="badge badge-warning">
                                                                در انتظار
                                                            </span>
                                                        </td>


                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="mobile-size " data-screen="mobile">
                                        {{-- @foreach ($trans as $key)
                                <div class=" border rounded mb-1">
                                    <div class="row pt-1">
                                        <div class="col mr-2">
                                            <h6 class="">
                                                تاریخ تراکنش:

                                            </h6>
                                        </div>
                                        <div class="col">
                                            <span class="transaction_datetime">
                                                {{ jdate($key->created_at)->format('d/M/Y') }}
                                                <br>
                                                {{ jdate($key->created_at)->format('H:i:s') }}
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
                                                {{ $key->type == 'deposit' ? 'شارژ کیف پول' : 'برداشت ازکیف پول' }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row pt-1">
                                        <div class="col mr-2">
                                            <h6 class="">
                                                منبع
                                            </h6>
                                        </div>
                                        <div class="col">
                                            {{ $key->source == 'user' ? 'کاربر' : 'اپراتور' }}
                                        </div>
                                    </div>
                                    <div class="row pt-1">
                                        <div class="col mr-2">

                                            <h6 class="">
                                                مبلغ تراکنش </h6>
                                        </div>
                                        <div class="col">

                                            <span
                                                class="moneyInputSpan {{ $key->type == 'deposit' ? 'text-success' : 'text-danger' }}">{{ $key->amount }}</span>
                                            ریال
                                        </div>
                                    </div>
                                    <div class="row pt-1">
                                        <div class="col mr-2">

                                            <h6 class="">
                                                وضعیت </h6>
                                        </div>

                                        <div class="col">
                                            <span
                                                class="{{ $key->status == 'success' ? 'text-success' : 'text-danger' }}">{{ $key->status == 'success' ? 'موفق' : 'ناموفق' }}</span>
                                        </div>

                                    </div>

                                </div>
                            @endforeach --}}
                                    </div>
                                @else
                                    <div class="p-3">
                                        <div class="alert alert-warning">
                                            چیزی برای نمایش نیست!
                                        </div>
                                    </div>
                                @endif
                                <div class="mt-3">
                                    {{ $lottery->appends(['tab' => 'lottery', 'page' => $lottery->currentPage()])->links('front::components.paginate') }}
                                </div>
                            </div>
                            <div id="invoices"
                                class="container tab-pane my-2 py-3 {{ request('tab') == 'invoice' ? 'active' : 'fade' }}">

                                <div class="row">
                                    <div class="col-md-6 col-12 d-flex justify-content-between align-items-center">
                                        <div class="form-group d-flex align-items-center">
                                            <label for="first_name" class="mr-2">
                                                فاکتور های خرید شما
                                            </label>
                                            <div class="d-flex ">
                                                {{-- <input readonly type="text" class="form-control moneyInput" id="first_name"
                                                name="first_name" value="{{ $user->wallet->balance ?? 0 }}"
                                                style="margin-left: 4px"><span> ریال</span> --}}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                @if ($invoice->count() > 0)
                                    <div class="pc-size" data-screen="pc">

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        تاریخ ارسال
                                                    </th>
                                                    <th>
                                                        شماره فاکتور
                                                    </th>
                                                    <th>
                                                        مبلغ خرید
                                                    </th>
                                                    <th>
                                                        وضعیت
                                                    </th>
                                                </tr>
                                            </thead>
                                            @php
                                                $counter = ($invoice->currentPage() - 1) * $invoice->perPage() + 1;
                                            @endphp
                                            <tbody>
                                                @foreach ($invoice as $key)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>
                                                            {{ jDate($key->created_at)->format('Y-m-d') }}
                                                        </td>
                                                        <td>
                                                            {{ $key->number }}
                                                        </td>
                                                        <td>
                                                            {{ $key->amount }}
                                                        </td>
                                                        <td>
                                                            @if ($key->state == 'pending')
                                                                <span class="badge badge-primary">انتظار تأیید</span>
                                                            @elseif($key->state == 'valid')
                                                                <span class="badge badge-success">تأیید شده</span>
                                                            @else
                                                                <span class="badge badge-danger">رد شده</span>
                                                            @endif
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="mobile-size " data-screen="mobile">
                                        {{-- @foreach ($trans as $key)
                                    <div class=" border rounded mb-1">
                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    تاریخ تراکنش:

                                                </h6>
                                            </div>
                                            <div class="col">
                                                <span class="transaction_datetime">
                                                    {{ jdate($key->created_at)->format('d/M/Y') }}
                                                    <br>
                                                    {{ jdate($key->created_at)->format('H:i:s') }}
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
                                                    {{ $key->type == 'deposit' ? 'شارژ کیف پول' : 'برداشت ازکیف پول' }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    منبع
                                                </h6>
                                            </div>
                                            <div class="col">
                                                {{ $key->source == 'user' ? 'کاربر' : 'اپراتور' }}
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    مبلغ تراکنش </h6>
                                            </div>
                                            <div class="col">

                                                <span
                                                    class="moneyInputSpan {{ $key->type == 'deposit' ? 'text-success' : 'text-danger' }}">{{ $key->amount }}</span>
                                                ریال
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    وضعیت </h6>
                                            </div>

                                            <div class="col">
                                                <span
                                                    class="{{ $key->status == 'success' ? 'text-success' : 'text-danger' }}">{{ $key->status == 'success' ? 'موفق' : 'ناموفق' }}</span>
                                            </div>

                                        </div>

                                    </div>
                                @endforeach --}}
                                    </div>
                                @else
                                    <div class="p-3">
                                        <div class="alert alert-warning">
                                            چیزی برای نمایش نیست!
                                        </div>
                                    </div>
                                @endif

                                <div class="mt-3">
                                    {{ $invoice->appends(['tab' => 'invoice', 'page' => $invoice->currentPage()])->links('front::components.paginate') }}
                                </div>
                            </div>
                            <div id="winners"
                                class="container tab-pane my-2 py-3 {{ request('tab') == 'winner' ? 'active' : 'fade' }}">

                                <div class="row">
                                    <div class="col-md-6 col-12 d-flex justify-content-between align-items-center">
                                        <div class="form-group d-flex align-items-center">
                                            <label for="first_name" class="mr-2">
                                                فاکتور های خرید شما
                                            </label>
                                            <div class="d-flex ">
                                                {{-- <input readonly type="text" class="form-control moneyInput" id="first_name"
                                                name="first_name" value="{{ $user->wallet->balance ?? 0 }}"
                                                style="margin-left: 4px"><span> ریال</span> --}}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                @if ($winners->count() > 0)
                                    <div class="pc-size" data-screen="pc">

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        کاربر
                                                    </th>
                                                    <th>
                                                        کد قرعه کشی
                                                    </th>
                                                    <th>
                                                        نوع قرعه کشی
                                                    </th>
                                                    <th>
                                                        تاریخ قرعه کشی
                                                    </th>
                                                </tr>
                                            </thead>
                                            @php
                                                $counter = ($winners->currentPage() - 1) * $winners->perPage() + 1;
                                            @endphp
                                            <tbody>
                                                @foreach ($winners as $key)
                                                    <tr>
                                                        <td>
                                                            {{ $counter++ }}
                                                        </td>
                                                        <td>
                                                            {{ $key->user->first_name . ' ' . $key->user->last_name }}
                                                        </td>
                                                        <td>
                                                            {{ $key->latteryCode->code }}
                                                        </td>
                                                        <td>
                                                            @if ($key->type == 'weekly')
                                                                <span class="badge badge-primary">هفته ای</span>
                                                            @elseif($key->type == 'monthly')
                                                                <span class="badge badge-success">ماهانه</span>
                                                            @else
                                                                <span class="badge badge-danger">سالانه</span>
                                                            @endif
                                                        </td>
                                                        <td>
                                                            {{ jDate($key->lottery_date)->format('Y-m-d') }}
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="mobile-size " data-screen="mobile">
                                        {{-- @foreach ($trans as $key)
                                    <div class=" border rounded mb-1">
                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    تاریخ تراکنش:

                                                </h6>
                                            </div>
                                            <div class="col">
                                                <span class="transaction_datetime">
                                                    {{ jdate($key->created_at)->format('d/M/Y') }}
                                                    <br>
                                                    {{ jdate($key->created_at)->format('H:i:s') }}
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
                                                    {{ $key->type == 'deposit' ? 'شارژ کیف پول' : 'برداشت ازکیف پول' }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">
                                                <h6 class="">
                                                    منبع
                                                </h6>
                                            </div>
                                            <div class="col">
                                                {{ $key->source == 'user' ? 'کاربر' : 'اپراتور' }}
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    مبلغ تراکنش </h6>
                                            </div>
                                            <div class="col">

                                                <span
                                                    class="moneyInputSpan {{ $key->type == 'deposit' ? 'text-success' : 'text-danger' }}">{{ $key->amount }}</span>
                                                ریال
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col mr-2">

                                                <h6 class="">
                                                    وضعیت </h6>
                                            </div>

                                            <div class="col">
                                                <span
                                                    class="{{ $key->status == 'success' ? 'text-success' : 'text-danger' }}">{{ $key->status == 'success' ? 'موفق' : 'ناموفق' }}</span>
                                            </div>

                                        </div>

                                    </div>
                                @endforeach --}}
                                    </div>
                                @else
                                    <div class="p-3">
                                        <div class="alert alert-warning">
                                            چیزی برای نمایش نیست!
                                        </div>
                                    </div>
                                @endif

                                <div class="mt-3">
                                    {{ $winners->appends(['tab' => 'winner', 'page' => $winners->currentPage()])->links('front::components.paginate') }}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('front::partials.modal')

    <!-- End Content -->
@endsection

@push('scripts')
    <script src="{{ theme_asset('js/pages/lottery/index.js') }}"></script>
    <script src='{{ asset('front/script.js') }}'></script>
@endpush
