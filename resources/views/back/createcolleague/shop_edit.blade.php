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
                                    <li class="breadcrumb-item">مدیریت lll
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
                        <h4 class="card-title">همکاری در فروش</h4>
                    </div>
                    <div class="card-content">
                        <h6 class="card-title m-2">اصلاح فروشگاه: {{ $store->nameofstore }}</h6>
                        <div class="container mt-3">


                            {{-- creating new store form --}}
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <form action="{{ route('admin.createcolleague.shopUpdate', [$store->id]) }}" method="POST"
                                    enctype="multipart/form-data" id="store_create_form">
                                    @method('PUT')
                                    @csrf

                                    <div id="home" class="container tab-pane active"><br>
                                        <div class="row">

                                            <div class="col-md-6 col-12">
                                                <div class="form-group align-items-center">
                                                    <h6 for="first_name" class="mr-2">
                                                        مسئول فروشگاه
                                                    </h6>

                                                    <div class="d-flex">
                                                        <input readonly type="selectperson" class="form-control"
                                                            value="{{ $store->user->id }}">
                                                    </div>


                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">

                                            </div>
                                        </div>
                                        <div class="row">

                                            <div class="">
                                                <div class="form-group align-items-center">
                                                    <label for="first_name" class="mr-2">
                                                        آپلود تعدادی عکس(قرارداد ها و فورم ها)
                                                    </label>

                                                    <div class="row">

                                                        <div class="col-sm">
                                                            <input multiple type="file" class="form-control mt-1 mr-1"
                                                                name="uploaddocument[]" value="{{ old('uploaddocument') }}">
                                                            <span class="text-danger">
                                                                @error('uploaddocument')
                                                                    {{ $message }}
                                                                @enderror
                                                            </span>
                                                        </div>


                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    نام فروشگاه
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="nameofstore"
                                                        value="{{ $store->nameofstore }}">
                                                    <span class="text-danger">
                                                        @error('nameofstore')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    آدرس فروشگاه
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="addressofstore"
                                                        value="{{ $store->addressofstore }}">
                                                    <span class="text-danger">
                                                        @error('addressofstore')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    اعتبار فروشگاه
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="col pb-2">

                                                    <div class="d-flex align-items-center">
                                                        <input type="text" class="form-control moneyInput"
                                                            id="moneyInput" name="storecredit" style="margin-left: 4px"
                                                            value="{{ $store->storecredit }} ">
                                                        ریال

                                                    </div>
                                                    <span class="text-danger">
                                                        @error('storecredit')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    درصد کارمزد فروشگاه
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="number" class="form-control" name="feepercentage"
                                                        value="{{ $store->feepercentage }}">
                                                    <span class="text-danger">
                                                        @error('feepercentage')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    مدت زمان برای تصفیه
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="number" class="form-control" name="settlementtime"
                                                        value="{{ $store->settlementtime }}">
                                                    <span class="text-danger">
                                                        @error('settlementtime')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    تاریخ پایان قرارداد
                                                </h5>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                <div class="form-group">
                                                    <input type="text" placeholder="تاریخ پایان قرار داد را مشخص کنید."
                                                        class="form-control persian-date-picker" name="enddate"
                                                        value="{{ $store->enddate }}" data-timestamps="false">
                                                    <span class="text-danger">
                                                        @error('enddate')
                                                            {{ $message }}
                                                        @enderror
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row p-1 d-flex justify-content-between">
                                            <div class="col p-1">
                                                <input type="button" id="summit_button" value="تأیید"
                                                    class="btn btn-info btn-lg"
                                                    style="background-color: none; text-color:black">
                                            </div>
                                            <div class="col d-flex justify-content-end p-1">
                                                <a href="{{ route('admin.createcolleague.shopList') }}"
                                                    style="font-size:20px" class="btn btn-primary"><i
                                                        class="feather icon-arrow-left-circle"></i>
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </form>
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
    <script src="{{ asset('back/assets/js/pages/createcollegue/myscript.js') }}"></script>
@endpush
