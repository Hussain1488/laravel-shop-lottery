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
$('.lottery_code_button').on('click', function () {
    $('#general_modal').modal();
});
$('#lottery-daily-code-button').on('click', function () {
    $('#general_modal').modal('hide');
    var formData = $('#daily_code_insert_form').serialize();
    $.blockUI(loading);
    $.ajax({
        url: $(this).attr('action'),
        type: 'GET',
        data: formData,
        success: function (response) {
            $.unblockUI();
            // $('#large_modal').modal();
            if (response.status == 'error') {
                toastr.warning(response.data);
            } else {
                $('#code_show_conteiner').html(
                    '<span>درخواست شما با موفقیت انجام شد</span>' +
                        '<br />' +
                        'کد قرعه کشی شما : ' +
                        response.data +
                        ' میباشد! شما میتوانید نتایج و کد قرعه کشی خود را در پروفایل خود مشاهده کنید!'
                );
                $('#large_modal').modal();
            }
        }
    });
});

