// wallet recharge methods

var flag;
var pay_url;
var insta_pay_url;
var resend_time = Math.floor(Date.now() / 1000) + 60;
var loading = {
    message:
        '<div class="loadingio-spinner-eclipse-mbdtacxsn3d"> ' +
        '<div class="ldio-ffthf4779sc">' +
        '<div></div>' +
        '</div>' +
        '</div>',
    css: {
        width: 'auto' /* Auto width for the blockUI container */,
        top: '50%' /* Center vertically */,
        left: '50%' /* Center horizontally */,
        transform: 'translate(-50%, -50%)' /* Center the element itself */,
        backgroundColor: 'transparent' /* No background color */,
        border: 'none' /* No border */,
        color: '#333' /* Text color */
    }
};

$('#wallet_recharg_button1').on('click', function () {
    $('#rechargeForm1').modal();
});

$('#sendAgain1').on('click', function () {
    $.blockUI(loading);
    $.ajax({
        url: codeResentAddress,
        type: 'GET',
        success: function () {
            $('#code_error1').addClass('d-none');
            $('#success-alert2').text('کد مجدد برای شما ارسال شد!');
            $('#success-alert2').removeClass('d-none');
            $.unblockUI();
            counterTime();
        }
    });
});

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
            counterTime();
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
            counterTime();
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
                $('#code_error1').text(
                    'کد وارده اشتباه است، لطفا کد درست را وارد کنید'
                );
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
                $.unblockUI();
                $('#code_error1').removeClass('d-none');
                $('#code_error1').text(
                    'کد وارده اشتباه است، لطفا کد درست را وارد کنید'
                );
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
                $('#code_error1').removeClass('d-none');
                $('#code_error1').text(
                    'کد وارده اشتباه است، لطفا کد درست را وارد کنید'
                );
            }
        });
    }
});
function counterTime() {
    resend_time = Math.floor(Date.now() / 1000) + 60;
    updateCounter();
    $('#sendAgain1').addClass('d-none');
    $('#resent-counter2').removeClass('d-none');
}

function updateCounter() {
    var currentTime = Math.floor(Date.now() / 1000);
    var timeRemaining = Math.max(0, resend_time - currentTime);

    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;

    // Update the countdown element
    $('#countdown-verify-end2').text(pad(minutes) + ':' + pad(seconds));

    if (timeRemaining > 0) {
        // If time is remaining, schedule the next update
        setTimeout(updateCounter, 1000);
    } else {
        // If time is up, show the "Send Again" button
        $('#sendAgain1').removeClass('d-none');
        $('#resent-counter2').addClass('d-none');
    }
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}
