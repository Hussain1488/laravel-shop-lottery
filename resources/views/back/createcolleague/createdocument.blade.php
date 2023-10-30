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
                    </div>
                    <div class="card-content">
                        <h6 class="card-title m-2">سند جدید</h6>
                        <div class="container mt-3">


                            <form action="{{ route('admin.colleagueCredit.store') }}" method="POST"
                                enctype="multipart/form-data">
                                @csrf


                                <div class="tab-content">
                                    <div id="home" class="container tab-pane active"><br>


                                        <div class="row">
                                            <div class="col-md-3 col-6 pt-2">
                                                <h5>
                                                    نام بده کار
                                                </h5>
                                            </div>
                                            <div class="col-md-3 col-6">
                                                <div class="form-group">
                                                    <label>سرچ بر اساس شماره تلفن</label>
                                                    <select type="text" class="form-control" name="userselected">
                                                        {{-- @foreach ($users as $item)
                                                            <option value="{{ $item->id }}">{{ $item->username }}
                                                            </option>
                                                        @endforeach --}}
                                                        <option value="">Hussian</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3 col-6 pt-2">
                                                <h5>
                                                    نام بستانکار
                                                </h5>
                                            </div>
                                            <div class="col-md-3 col-6">
                                                <div class="form-group">
                                                    <label>سرچ بر اساس شماره تلفن</label>
                                                    <select type="text" class="form-control" name="userselected">
                                                        @foreach ($users as $item)
                                                            <option value="{{ $item->id }}">{{ $item->username }}
                                                            </option>
                                                        @endforeach
                                                        {{-- <option value="">Hussian</option> --}}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">

                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="form-group d-flex align-items-center">
                                                    <h5 for="purchasecredit" class="mr-2">
                                                        مبلغ به ریال وارد شود
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="d-flex align-items-center">
                                                    <input type="text" placeholder="100,000"
                                                        class="form-control moneyInput" id="first_name"
                                                        name="purchasecredit" style="margin-left: 4px;">
                                                    <span>ریال</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="form-group d-flex align-items-center">
                                                    <h5 for="documents" class="mr-2">
                                                        آپلود مدارک
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="d-flex align-items-center">
                                                    <input multiple type="file" class="form-control mt-1 mr-1"
                                                        name="documents[]">
                                                </div>
                                            </div>
                                        </div>


                                        <div class="row my-2">
                                            <div class="col-md-6 col-12 pt-2">
                                                <h5>
                                                    شماره ثبت این سند به شماره ۹۸۵۶۳ میباشد.
                                                </h5>
                                                <h5>
                                                    شماره پیگیری سند در سند اداری ثبت شده و تحویل بایگانی شود.</h5>
                                            </div>

                                        </div>

                                        <div class="row ">
                                            <div class="col d-flex align-items-baseline justify-content-center">
                                                <input type="submit"
                                                    class="btn btn-primary my-1"value=" تأیید نهایی تغییرات" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>

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