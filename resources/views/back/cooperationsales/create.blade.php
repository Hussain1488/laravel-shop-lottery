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
                <!-- Description -->

                <!--/ Description -->

            </div>
        </div>
    </div>

@endsection

@include('back.partials.plugins', ['plugins' => ['jquery.validate']])

@php
    $help_videos = [
        config('general.video-helpes.users')
    ];
@endphp

@push('scripts')
    <script src="{{ asset('back/assets/js/pages/users/all.js') }}"></script>
    <script src="{{ asset('back/assets/js/pages/users/create.js') }}"></script>
@endpush
