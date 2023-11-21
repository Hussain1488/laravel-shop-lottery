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

            {{--  Creating documnet form --}}
            <div class="content-body">
                <section class="card">
                    <div class="card-header">
                    </div>
                    <div class="card-content">
                        <h6 class="card-title m-2">سند جدید</h6>
                        <div class="container mt-3">


                            <form action="{{ route('admin.createcolleague.Documentstore') }}" method="POST"
                                enctype="multipart/form-data" id="colleagueDocumentStore">
                                @csrf
                                <input readonly name="numberofdocuments" type="hidden" value="{{ $number }}">


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
                                                    <label></label>
                                                    <select type="text" class="form-control select2" name="namedebtor">
                                                        @isset($bank)
                                                            <option value="mellat bank">بده کار را انتخاب کنید</option>
                                                            @foreach ($bank as $key)
                                                                <option value="{{ $key->id }}">{{ $key->accountnumber }}
                                                                </option>
                                                            @endforeach
                                                        @else
                                                            <option value="mellat bank">گزینه ای برای انتخاب وجود ندارد</option>
                                                        @endisset

                                                    </select>
                                                    @error('namedebtor')
                                                        <span class="text-danger">
                                                            {{ $message }}
                                                        </span>
                                                    @enderror
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
                                                    <select type="text" class="form-control select2" id="user_selection"
                                                        name="namecreditor">
                                                        @isset($users)
                                                            <option value="">کاربر را انتخاب کنید
                                                            </option>
                                                            @foreach ($users as $item)
                                                                <option data-name="{{ $item->first_name }}"
                                                                    data-lastname="{{ $item->last_name }}"
                                                                    value="{{ $item->id }}">
                                                                    {{ $item->username }}</option>
                                                            @endforeach
                                                        @else
                                                            <option value="">کاربری برای انتخاب وجود ندارد</option>
                                                        @endisset
                                                    </select>
                                                    @error('namecreditor')
                                                        <span class="text-danger">
                                                            {{ $message }}
                                                        </span>
                                                    @enderror
                                                    <div class="m-1">
                                                        <span class="user_title" id="user_title"></span>
                                                        <span class="text-success user_name" id="user_name"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">

                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="form-group d-flex align-items-center">
                                                    <h5 for="purchasecredit" class="mr-2">
                                                        مقدار اعتبار
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-6 pt-2">
                                                <label>مبلغ به ریال وارد شود</label>
                                                <div class="d-flex align-items-center">

                                                    <input type="text" placeholder="100,000"
                                                        class="form-control moneyInput" id="ReCredintAmount"
                                                        name="ReCredintAmount" style="margin-left: 4px;">
                                                    <span>ریال</span>
                                                </div>
                                                @error('ReCredintAmount')
                                                    <span class="text-danger">
                                                        {{ $message }}
                                                    </span>
                                                @enderror

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="form-group d-flex align-items-center">
                                                    <h5 for="documents" class="mr-2">
                                                        توضیحات:
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-6 pt-2">
                                                <div class="d-flex align-items-center">
                                                    <textarea class="form-control mt-1 mr-1" name="description"></textarea>
                                                </div>
                                                @error('description')
                                                    <span class="text-danger">
                                                        {{ $message }}
                                                    </span>
                                                @enderror
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
                                                @error('documents')
                                                    <span class="text-danger">
                                                        {{ $message }}
                                                    </span>
                                                @enderror
                                            </div>
                                        </div>




                                        @if (session('number'))
                                            <div class="alert alert-success mt-2" role="alert">

                                                <h5>
                                                    شماره ثبت این سند به شماره {{ session('number') }} میباشد.
                                                </h5>
                                                <h5>
                                                    شماره پیگیری سند در سند اداری ثبت شده و تحویل بایگانی شود.</h5>

                                            </div>
                                        @endif



                                        <div class="row ">
                                            <div class="col d-flex align-items-baseline justify-content-center">
                                                <input type="button" id="submit_button2"
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
