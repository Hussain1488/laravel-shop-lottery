$(document).ready(function () {
    $('#reccredit_day').on('input', function () {
        // Get the value of the input
        var inputValue = $(this).val();

        // Check if the value is within the specified range
        if (inputValue >= 1 && inputValue <= 29) {
            // Clear any previous validation message
            $('#validationMessage').text('');
        } else {
            // Show a validation message
            $('#validationMessage').text(
                'اطلاعات نادرست، لطفا عددی بین ۱ الی ۲۹ وارد کنید!'
            );
        }
    });
});
