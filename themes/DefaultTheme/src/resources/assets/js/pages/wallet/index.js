$('.show-history').on('click', function () {
    var btn = $(this);

    $.ajax({
        url: btn.data('action'),
        type: 'GET',
        success: function (data) {
            $('#history-detail').empty();
            $('#history-detail').append(data);
            $('#history-show-modal').modal('show');
        },
        beforeSend: function (xhr) {
            block(btn);
        },
        complete: function () {
            unblock(btn);
        }
    });
});

$('#wallet_recharg_button').on('click', function () {
    console.log($(this).data('url'));
    $.ajax({
        url: $(this).data('url'),
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {
            console.log('hey');
            $('#smsVarifyModal').modal();
            $('#code_error').addClass('d-none');
        }
    });
});
$('#sendCode').on('click', function () {
    console.log('Button clicked');

    let form = $('#code_varification');
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
            $('#smsVarifyModal').modal('hide');
            $('#rechargeForm').modal();
        },
        error: function (xhr) {
            $('#code_error').removeClass('d-none');
            if (xhr.responseJSON.error) {
                // Display the error message in #code_error
                $('#code_error').text(xhr.responseJSON.error);
            } else {
                // Handle other errors if needed
                $('#code_error').text(
                    'کد وارده اشتباه است، لطفا کد درست را وارد کنید'
                );
                console.log('Unexpected error:', xhr);
            }
        }
    });
});
