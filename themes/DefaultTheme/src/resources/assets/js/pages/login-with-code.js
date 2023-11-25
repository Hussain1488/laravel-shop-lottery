jQuery('#login-with-code-form').validate({
    rules: {
        mobile: {
            required: true
        }
    }
});

$(document).ready(function () {
    $('.activation-code-input').activationCodeInput({
        number: 5
    });
});

$(document).ready(function () {
    $('#login-with-code-form').submit(function (e) {
        e.preventDefault();

        if ($(this).valid()) {
            var formData = new FormData(this);
            var form = $(this);

            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: formData,
                success: function (data) {
                    if (data.data == 'login') {
                        var url = new URL(form.data('redirect'));
                        url.searchParams.set('mobile', $('#mobile').val());
                        window.location.href = url;
                    } else {
                        $('#registerWithCode').modal();
                        unblock();
                    }
                },

                beforeSend: function (xhr) {
                    block('.form-ui');
                    xhr.setRequestHeader(
                        'X-CSRF-TOKEN',
                        $('meta[name="csrf-token"]').attr('content')
                    );
                },
                complete: function () {
                    unblock('.form-ui');
                },

                cache: false,
                contentType: false,
                processData: false
            });
        }
    });
});
