// wallet recharge methods

var flag;
var pay_url;
var insta_pay_url;
var loading = {
    message:
        '<div class="loadingio-spinner-eclipse-mbdtacxsn3d"> ' +
        '<div class="ldio-ffthf4779sc">' +
        '<div></div>' +
        '</div>' +
        '</div>',
    css: {
        width: 'auto' /* Auto width for the blockUI container */,
        top: '40%' /* Position from the top */,
        left: '40%' /* Position from the left */,
        backgroundColor: 'transparent' /* No background color */,
        border: 'none' /* No border */,
        color: '#333' /* Text color */
    }
};

$('#myButton').on('click', function () {
    $('#rechargeForm1').modal();
});
// function TimeCount() {
//     var $countdownOptionEnd = $('#countdown-verify-end1');

//     $countdownOptionEnd.countdown({
//         date: new Date().getTime() / 1000 + 60, // 1 minute later
//         text: '<span class="day">%s</span><span class="hour">%s</span><span>: %s</span><span>%s</span>',
//         end: function () {
//             $countdownOptionEnd.html(
//                 "<a href='" +
//                     data('action') +
//                     "' class='btn-link-border'>ارسال مجدد</a>"
//             );
//         }
//     });
// }

$('#wallet_recharg_button1').on('click', function () {
    flag = 1;
    console.log($(this).data('url'));
    $.blockUI(loading);
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            $.unblockUI();

            $('#operation_title').text(
                'جهت تأیید شارژ کیف پول کد ارسال شده را وارد کرده و کلید تأیید را بزنید!'
            );
            $('#smsVarifyModal1').modal();
            // TimeCount();
            $('#code_error1').addClass('d-none');
        }
    });
});

$('#sendCode1').on('click', function () {});

// prepayment methods
$('.smsGeneratButton').on('click', function () {
    flag = 2;
    // console.log($(this).data('url'));
    pay_url = $(this).data('href');
    $.blockUI(loading);
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            $('#operation_title').text(
                'جهت تأیید پرداخت پیش پرداخت کد ارسال شده را وارد کرده و کلید تأیید را بزنید!'
            );

            $.unblockUI();
            console.log('hey');
            $('#smsVarifyModal1').modal();
            $('#code_error1').addClass('d-none');
        }
    });
});
$('#insta_pay_button').on('click', function () {
    flag = 3;
    // console.log($(this).data('url'));
    insta_pay_url = $(this).data('href');
    $.blockUI(loading);
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            $.unblockUI();
            $('#operation_title').text(
                'جهت تأیید پرداخت   کد ارسال شده را وارد کرده و کلید تأیید را بزنید!'
            );
            $('#smsVarifyModal1').modal();
            $('#code_error1').addClass('d-none');
        }
    });
});

$('#sendCode1').on('click', function () {
    if (flag == 1) {
        let form = $('#code_varification1');
        var formData = new FormData(form[0]);

        $.ajax({
            url: $(this).attr('data-url'),
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                $.unblockUI();
                $('#smsVarifyModal1').modal('hide');
                $('#rechargeForm1').modal();
            },
            error: function (xhr) {
                $.unblockUI();

                $('#code_error1').removeClass('d-none');
                if (xhr.responseJSON.error) {
                    // Display the error message in #code_error
                    $('#code_error1').text(xhr.responseJSON.error);
                } else {
                    // Handle other errors if needed
                    $('#code_error1').text(
                        'کد وارده اشتباه است، لطفا کد درست را وارد کنید'
                    );
                    console.log('Unexpected error:', xhr);
                }
            }
        });
    } else if (flag == 2) {
        let form = $('#code_varification1');
        var formData = new FormData(form[0]);

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                $.unblockUI();
                window.location.href = pay_url;
                // console.log('success');
            },
            error: function (xhr) {
                $('#code_error1').text(xhr.responseJSON.data);
            }
        });
    } else if (flag == 3) {
        let form = $('#code_varification1');
        var formData = new FormData(form[0]);

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function () {
                $.unblockUI();
                window.location.href = insta_pay_url;
                // console.log('success');
            },
            error: function (xhr) {
                $.unblockUI();

                $('#code_error1').text(xhr.responseJSON.data);
            }
        });
    }
});
