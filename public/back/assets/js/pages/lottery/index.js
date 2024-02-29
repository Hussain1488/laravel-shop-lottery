$(document).ready(function () {
    $('#daily_code_gerator_button').on('click', function () {
        let lastDay = $('.lastValue').val();
        let today = new Date();
        let lastDayDate = new Date(lastDay);
        lastDayDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (lastDayDate.getTime() < today.getTime()) {
            toastr.warning(
                'امروز نمیتوانید برای تولید کد روزانه قرعه کشی درخواست دهید. لطفا بعدا دوباره امتهان کنید!'
            );
        } else {
            let button = $(this); // Store reference to the button
            $.ajax({
                url: button.attr('action'), // Use stored reference
                type: 'GET',
                success: function (response) {
                    toastr.success('تولید کد روزانه برای یک ماه ایجاد شد!');
                    location.reload();
                },
                error: function (xhr, status, error) {
                    // Handle errors here
                },
                beforeSend: function (xhr) {
                    block(button);
                },
                complete: function () {
                    unblock(button);
                }
            });
        }
    });
});
