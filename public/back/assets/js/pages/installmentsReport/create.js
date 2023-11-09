$(document).ready(function () {
    $('.monyInputSpan').each(function () {
        var input = $(this).text();
        var digits = input.replace(/\D/g, '');
        var formattedNumber = addCommas(digits);
        $(this).text(formattedNumber);
    });
    $('.moneyInput').each(function () {
        var input = $(this).val();

        // Remove any non-digit characters (e.g., commas)
        var digits = input.replace(/\D/g, '');

        // Format the number with commas
        var formattedNumber = addCommas(digits);

        // Update the input field with the formatted number
        $(this).val(formattedNumber);
    });

    // Function to add commas as a thousands separator
    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    $('#creating_bank_button').on('click', function () {
        console.log('hey');
        $('#create_bank_form').submit();
    });
});

$('#Account_type').on('change', function () {
    let account_type = $('#Account_type').val();
    if (account_type == 'bank') {
        $('#Acount_number_prefix').val(21);
    } else if (account_type == 'expense') {
        $('#Acount_number_prefix').val(22);
    } else if (account_type == 'income') {
        $('#Acount_number_prefix').val(23);
    } else if (account_type == 'intermediaryـinstallments') {
        $('#Acount_number_prefix').val(24);
    } else if (account_type == 'store_credit_interface') {
        $('#Acount_number_prefix').val(25);
    }
});
