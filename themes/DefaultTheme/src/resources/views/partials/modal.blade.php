<div class="modal fade" id="general_modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">
                    درخواست کد قرعه کشی
                </h4>
            </div>
            <hr />
            <!-- Modal body -->
            <div class="modal-body">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" style="font-size: .625rem" data-toggle="tab" href="#home">
                            کد قرعه کشی با کد روزانه</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="font-size: .625rem" data-toggle="tab" href="#menu1">
                            کد قرعه کشی با فاکتور خرید
                        </a>
                    </li>


                </ul>
                <div class="tab-content ">
                    <div id="home" class="container tab-pane active my-2 py-3">
                        <form id="daily_code_insert_form" action="{{ route('front.lottery.dailyCode') }}"
                            class="setting_form" method="get">
                            @csrf
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="form-row-title">
                                        <h6 class="">
                                            کد روزانه را وارد کنید.
                                        </h6>
                                    </div>
                                    <div class="form-row form-group">
                                        <input type="number" class="form-control input-ui pr-2 amount-input"
                                            name="daily_code">
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="form-row-title">
                                        <h6>منبع کد را انتخاب کنید.</h6>
                                    </div>
                                    <div class="form-row form-group">
                                        <select class="form-control py-0 gateway-select" name="code_source" required>
                                            <option class="" value="">منبع را انتخاب کنید

                                            </option>
                                            <option class="" value="insta">
                                                اینستاگرام
                                            </option>
                                            <option class="" value="rubika">
                                                روبیکا
                                            </option>
                                            <option class="" value="eitaa">
                                                ایتا
                                            </option>
                                            <option class="" value="site">
                                                وبسایت خانه اقساط
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form-row mt-3 justify-content-center my-5">
                                <button id="lottery-daily-code-button" action="{{ route('front.lottery.dailyCode') }}"
                                    type="button" class="btn-primary-cm btn-with-icon ml-2">
                                    <i class="mdi mdi-arrow-left"></i>
                                    ارسال کد روزانه
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="menu1" class="container tab-pane my-2 py-3">
                        <form action="{{ route('front.lottery.invoiceCode') }}" class="" method="POST"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="form-row-title">
                                        <h6 class="">
                                            شماره فاکتور را وارد کنید
                                        </h6>
                                    </div>
                                    <div class="form-row form-group">
                                        <input type="number" class="form-control input-ui pr-2 amount-input"
                                            name="number">
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="form-row-title">
                                        <h6 class="">
                                            مبلغ فاکتور
                                        </h6>
                                    </div>
                                    <div class="form-row form-group">
                                        <input type="number" class="form-control input-ui pr-2 amount-input"
                                            name="amount">
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="form-row-title">
                                        <h6>بار گزاری عکس فاکتور</h6>
                                    </div>
                                    <div class="form-row form-group">
                                        <input type="file" accept="image/*" class="form-control py-0" required
                                            name="invoice_img">

                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form-row mt-3 justify-content-center">
                                <button id="lottery-invoice-code-button"
                                    action="{{ route('front.lottery.invoiceCode') }}" type="submit"
                                    class="btn-primary-cm btn-with-icon ml-2">
                                    <i class="mdi mdi-arrow-left"></i>
                                    ارسال فاکتور خرید
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <!-- Modal footer -->

                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal fade bd-example-modal-sm" id="large_modal" tabindex="-1" role="dialog"
    aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="p-4 alert alert-success m-2 "id="code_show_conteiner">

            </div>
        </div>
    </div>
</div>
