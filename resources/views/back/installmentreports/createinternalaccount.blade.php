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
                                <li class="breadcrumb-item"> فرم ایجاد حساب های داخلی
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="content-body">
            <section class="card">

                <div class="card-content">
                    <form action="{{ route('admin.installmentreports.createinternalaccount') }}" id="storecreditoperatorForm" method="POST">
                        @csrf
                        <div class="container mt-3">

                            <div class="row">
                                <div class="col-md-3 col-6 pt-2">
                                    <h5>
                                        نام بانک
                                    </h5>
                                </div>
                                <div class="col-md-3 col-6">
                                    <input type="text" class="form-control" name="addressofstore" value="{{ old('addressofstore') }}">

                                </div>
                            </div>

                            <div class="row mt-8">
                                <div class="col-md-3 col-6 pt-2">
                                    <h5>
                                        شماره حساب
                                    </h5>
                                </div>
                                <div class="col-md-3 col-6">
                                    <input type="text" class="form-control" name="addressofstore" value="{{ old('addressofstore') }}">

                                </div>
                            </div>



                            <div class="row mt-8">
                                <div class="col-md-3 col-6 pt-2 ">
                                    <h5>
                                        ماهیت حساب
                                    </h5>
                                </div>
                                <div class="col-md-3 col-6">

                                    <div class="form-group">

                                        <select type="text" class="form-control user_select2" name="user">
                                            <option value="1"> بانک </option>
                                            <option value="1"> دآرمد </option>
                                            <option value="1"> هزینه </option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row p-1">
                            <div class="co">
                                <input type="submit" value="ایجاد حساب " class="btn btn-info">
                            </div>
                        </div>
                    </form>

                </div>
            </section>
        </div>

    </div>
</div>
@endsection