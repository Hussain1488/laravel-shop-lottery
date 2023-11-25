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
                                    <li class="breadcrumb-item">تنظیمات
                                    </li>
                                    <li class="breadcrumb-item active">تنظیمات پیامک
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-body">
                <!-- users edit start -->
                <section class="users-edit">
                    <div class="card">
                        <div id="main-card" class="card-content">
                            <div class="card-body">
                                <div class="tab-content">
                                    <form id="sms-form" action="{{ route('admin.cornjob.store') }}" method="POST">
                                        @csrf
                                        <h4 class="my-2">تنظیمات کرن جاب</h4>

                                        <hr>

                                        <fieldset>

                                            <legend>
                                                کرن جاب اعتبار فروشگاه
                                            </legend>
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <label>روز فراخوانی کرن
                                                        جاب <span class="text-danger">(۱ الی ۲۹)</span></label>
                                                    <input id="reccredit_day" type="number" class="form-control"
                                                        name="cornjob_call_day"
                                                        value="{{ option('cornjob_call_day') != null ? option('cornjob_call_day') : 1 }}">

                                                    <span class="text-danger" id="validationMessage"></span>
                                                    @error('cornjob_call_day')
                                                        <span class="text-danger">
                                                            {{ $message }}
                                                        </span>
                                                    @enderror
                                                </div>

                                            </div>

                                            <div class="row my-2 mb-4">

                                                <div class="form-group col-md-4">
                                                    <fieldset class="checkbox">
                                                        <div class="vs-checkbox-con vs-checkbox-primary">
                                                            <input data-class="store_reccredition_status" type="checkbox"
                                                                name="store_reccredition_status"
                                                                {{ option('store_reccredition_status') == 'on' ? 'checked' : '' }}>
                                                            <span class="vs-checkbox">
                                                                <span class="vs-checkbox--check">
                                                                    <i class="vs-icon feather icon-check"></i>
                                                                </span>
                                                            </span>
                                                            <span class="">فعال</span>
                                                        </div>
                                                    </fieldset>
                                                </div>

                                                <div class="row">
                                                    <div
                                                        class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                        <button type="submit" id="cornjob_form_button"
                                                            class="btn btn-primary glow">ذخیره
                                                            تغییرات</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- users edit ends -->

            </div>
        </div>
    </div>
@endsection

@include('back.partials.plugins', ['plugins' => ['jquery.validate']])

@php
    $help_videos = [config('general.video-helpes.sms-config')];
@endphp

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/settings/cornjob.js') }}?v=5"></script>
@endpush
