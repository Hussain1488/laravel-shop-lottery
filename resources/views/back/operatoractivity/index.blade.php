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
                                    <li class="breadcrumb-item active">ویرایش پروفایل
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
                        <h4 class="card-title">اسم کاربر</h4>
                    </div>

                    <div class="card-content">
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div class="">
                                <div id="home" class="container tab-pane "><br>



                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            لیست اپراتور ها
                                        </h3>
                                    </div>


                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    تاریخ فروشگاه
                                                </th>
                                                <th>
                                                    تاریخ پرداخت
                                                </th>
                                                <th>
                                                    نوع تراکنش
                                                </th>
                                                <th>
                                                    شماره ره گیری
                                                </th>
                                                <th class="">
                                                    مجموع تراکنش با کسر کارمزد
                                                </th>

                                            </tr>
                                        </thead>
                                        @php
                                            $counter = 1;
                                        @endphp
                                        <tbody>
                                            {{-- @foreach ($paidList as $key)
                                                <tr>
                                                    <td>
                                                        {{ $counter++ }}
                                                    </td>
                                                    <td>
                                                        {{ $key->payments->store->nameofstore }}
                                                    </td>
                                                    <td>
                                                        <span class="transaction_datetime">
                                                            {{ \Carbon\Carbon::parse($key->date)->format('Y-m-d') }}
                                                            <br>
                                                            {{ \Carbon\Carbon::parse($key->created_at)->format('H:i:s') }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        موفقت باشید
                                                    </td>
                                                    <td>
                                                        <span class="">{{ $key->Issuetracking }}</span>
                                                    </td>
                                                    <td class="">
                                                        <a href="{{ public_path($key->documentpayment) }}">
                                                            <span class="text-success">دانلود سند</span>
                                                        </a>
                                                    </td>


                                                </tr>
                                            @endforeach --}}
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>


            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script>
    <script src="{{ asset('back/assets/js/pages/installmentpurchse/create.js') }}"></script>
@endpush
