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
                        <h6 class="card-title m-2">ساخت افرادی که همکاری در فروش دارند</h6>
                        <div class="container mt-3">

                            < <!-- Tab panes -->
                                <div class="tab-content">
                                    <form action="{{ route('admin.createcolleague.store') }}" method="POST"
                                        enctype="multipart/form-data">
                                        @csrf

                                        <div id="home" class="container tab-pane active"><br>
                                            <div class="row">

                                                <div class="col-md-6 col-12">
                                                    <div class="form-group align-items-center">
                                                        <h6 for="first_name" class="mr-2">
                                                            انتخاب فرد مورد نظر از بین افرادی که لاگین کردند
                                                        </h6>

                                                        <div class="d-flex">
                                                            <select type="text" class="form-control" name="selectperson">
                                                                @foreach ($users as $item)
                                                                    <option value="{{ $item->id }}">
                                                                        {{ $item->username }}</option>
                                                                @endforeach
                                                            </select>
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
                                                                <input multiple type="file"
                                                                    class="form-control mt-1 mr-1" name="uploaddocument[]">
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
                                                        <input type="text" class="form-control" name="nameofstore">
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
                                                        <input type="text" class="form-control" name="addressofstore">
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
                                                        <input type="number" class="form-control" name="feepercentage">
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
                                                        <input type="date" class="form-control moneyInput"
                                                            id="jalali_datepicker" name="enddate">

                                                        {{-- <input type="text" id="publish_date_picker" class="datepicker"> --}}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-2"
                                                style="align-items:center ;display: flex;flex-direction: column;">
                                                <input type="submit" value="تأیید" class="btn btn-info btn-lg"
                                                    style="background-color: none; text-color:black">
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

@push('script')
    {{-- <script src="https://cdn.jsdelivr.net/npm/pikaday-jalali"></script> --}}
    {{-- <script src="https://cdn.jsdelivr.net/npm/pikaday"></script> --}}
    <script>
        $('#publish_date_picker').pDatepicker({
            timePicker: {
                enabled: true,
                meridian: {
                    enabled: false
                },
                second: {
                    enabled: false
                }
            },
            toolbox: {
                // enabled: true,
                calendarSwitch: {
                    enabled: false
                }
            },
            initialValue: false,
            altField: '#publish_date',
            altFormat: 'YYYY-MM-DD HH:mm:ss',

            onSelect: function(unixDate) {
                var date = $('#publish_date').val();
                $('#publish_date').val(date.toEnglishDigit());
            }
        });
    </script>
@endpush
