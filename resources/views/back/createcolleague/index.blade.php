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
                        <h4 class="card-title">اعتبار سنجی خریداران</h4>
                    </div>
                    <div class="card-content">
                        <h6 class="card-title m-2">ساخت افرادی که همکاری در فروش دارند</h6>
                        <div class="container mt-3">


                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div id="home" class="container tab-pane active"><br>


                                    <div class="row">
                                        <div class="col-md-3 col-6 pt-2">
                                            <h5>
                                                انتخاب فرد مورد نظر
                                            </h5>
                                        </div>
                                        <div class="col-md-3 col-6">
                                            <div class="form-group">
                                                <label>سرچ بر اساس شماره تلفن</label>
                                                <select type="text" class="form-control" name="userselected">
                                                    @foreach ($users as $item)
                                                        <option value="{{ $item->id }}">{{ $item->username }}</option>
                                                    @endforeach

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-md-3 col-6 pt-2">
                                            <div class="form-group d-flex align-items-center">
                                                <h5 for="first_name" class="mr-2">
                                                    مقدار اعتبار خرید اقساطی
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-6 pt-2">
                                            <div class="d-flex align-items-center">
                                                <input type="text" placeholder="100,000" class="form-control moneyInput"
                                                    id="first_name" name="first_name" style="margin-left: 4px;">
                                                <span>ریال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-md-3 col-6 pt-2">
                                            <div class="form-group d-flex align-items-center">
                                                <h5 for="first_name" class="mr-2">
                                                    موجودی نقدی
                                                </h5>


                                            </div>
                                        </div>
                                        <div class="col-md-3 col-6 pt-2">
                                            <div class="d-flex align-items-center">
                                                <input type="text" placeholder="100,000" class="form-control moneyInput"
                                                    id="first_name" name="first_name" style="margin-left: 4px;">
                                                <span>ریال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="">
                                            <div class="form-group align-items-center">
                                                <h5 for="first_name" class="mr-2">
                                                    آپلود مدارک
                                                </h5>

                                                <div class="row">

                                                    <div class="col-sm">
                                                        <input type="file" class="form-control mt-1 mr-1">
                                                    </div>
                                                    <div class="col-sm">
                                                        <input type="file" class="form-control mt-1 mr-1">
                                                    </div>
                                                    <div class="col-sm">
                                                        <input type="file" class="form-control mt-1 mr-1">
                                                    </div>

                                                </div>


                                            </div>
                                        </div>

                                    </div>


                                    <div class="row my-2">
                                        <div class="col-md-6 col-12 pt-2">
                                            <h5>
                                                تاریخ پایان اعتبار
                                            </h5>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <div class="form-group">
                                                <input type="date" class="form-control" name="last_name">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <a href="" class="btn btn-primary my-1">تأیید تغییرات</a>
                                        </div>
                                        <div class="col">

                                            <a href="" class="btn btn-danger my-1">انصراف </a>
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

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script>
    <script src="{{ asset('back/assets/js/pages/cooperationSales/create.js') }}"></script>
@endpush
