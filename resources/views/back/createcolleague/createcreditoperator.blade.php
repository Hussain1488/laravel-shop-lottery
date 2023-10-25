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
                        <form action="{{ route('admin.createcolleague.storecreditoperator') }}" method="POST">
                            @csrf
                            <div class="container mt-3">

                                <div class="row">
                                    <div class="col-md-3 col-6 pt-2">
                                        <h5>
                                            انتخاب فرد مورد نظر
                                        </h5>
                                    </div>
                                    <div class="col-md-3 col-6">

                                        <div class="form-group">
                                            <label>سرچ بر اساس شماره تلفن</label>
                                            <select type="text" class="form-control" name="user">

                                                @foreach ($users as $item)
                                                    <option value="{{ $item->id }}">{{ $item->username }}</option>
                                                @endforeach


                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row p-1">
                                    <div class="co">
                                        <input type="submit" value="تأیید" class="btn btn-info">

                                    </div>
                                </div>
                        </form>

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