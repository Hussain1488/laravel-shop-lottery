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
                        <div class="m-1">
                            <h2>
                                <a href="{{ route('admin.createcolleague.create') }}" style="font-size:16px"
                                    class=""><i style="font-size:30px"
                                        class="feather icon-plus-circle text-success"></i>ایجاد فروشگاه

                                </a>
                            </h2>
                        </div>
                    </div>

                    {{-- bank transacion report page --}}



                    <div class="card-content">
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div class="mb-3">
                                <div id="home" class="container tab-pane  mb-5"><br>

                                    {{-- <div class="">
                                        <form action="{{ route() }}"></form>
                                    </div> --}}

                                    <div class="row mt-1 ml-2 mb-2">
                                        <h3>
                                            لیست تمامی فروشگاه ها
                                        </h3>
                                    </div>
                                    <div class="row mb-2">

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
                                                    مالک فروشگاه
                                                </th>
                                                <th>
                                                    اعتبار فروشگاه
                                                </th>
                                                <th>
                                                    مقدار فروشات
                                                </th>
                                                <th>
                                                    تاریخ ختم قرارداد
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
                                            @foreach ($store as $key)
                                                <tr>
                                                    <td>
                                                        {{ $counter++ }}
                                                    </td>


                                                    <td>
                                                        <a href="{{ route('admin.createcolleague.show', [$key->id]) }}">
                                                            {{ $key->nameofstore }}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {{ $key->user->first_name . ' ' . $key->user->last_name }}

                                                    </td>
                                                    <td>
                                                        <span class="monyInputSpan">{{ $key->storecredit }}</span>

                                                    </td>
                                                    <td>
                                                        <span
                                                            class="monyInputSpan">{{ $key->salesamount != null ? $key->salesamount : 0 }}</span>

                                                    </td>
                                                    <td>
                                                        {{ \Carbon\Carbon::parse($key->enddate)->format('Y/m/d') }}

                                                    </td>
                                                    <td>
                                                        <a href="{{ route('admin.createcolleague.shopedit', [$key->id]) }}"
                                                            class="text-success">
                                                            <i class="feather icon-edit"></i>
                                                        </a>

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

    <script src="{{ asset('back/assets/js/pages/installmentsReport/create.js') }}"></script>
@endpush
