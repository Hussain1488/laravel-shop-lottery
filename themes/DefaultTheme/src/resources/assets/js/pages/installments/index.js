// wallet recharge methods

var flag;
var pay_url;
var insta_pay_url;
$('#wallet_recharg_button1').on('click', function () {
    flag = 1;
    console.log($(this).data('url'));
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            console.log('hey');
            $('#smsVarifyModal1').modal();
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
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
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
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            console.log('hey');
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
                $('#smsVarifyModal1').modal('hide');
                $('#rechargeForm1').modal();
            },
            error: function (xhr) {
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
                window.location.href = insta_pay_url;
                // console.log('success');
            },
            error: function (xhr) {
                $('#code_error1').text(xhr.responseJSON.data);
            }
        });
    }
});
