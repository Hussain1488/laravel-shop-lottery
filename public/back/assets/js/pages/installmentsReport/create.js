$(document).ready(function () {
    // $('.transaction_date').pDatePicker();

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

    $('#creating_bank_button').on('click', function () {
        // console.log('hey');
        let Prefix = $('#Acount_number_prefix').val();
        let main_account_number = $('#main_account_number').val();
        $('#main_account_number').val(Prefix + main_account_number);
        $('#create_bank_form').submit();
    });
    accountType();
});

$('.pay_button').on('click', function () {
    let dataId = $(this).data('id');
    let amount = String($(this).data('amount')).replace(/\D/g, '');
    let final = addCommas(amount);
    $('#deposit_amount_show').text(final);
    $('#pay_list_id').val(dataId);
    $('#myModal').modal();
});

$('#Account_type').on('change', function () {
    accountType();
});

function accountType() {
    let account_type = $('#Account_type option:selected').text();
    console.log(account_type);
    if (account_type == 'بانک') {
        $('#Acount_number_prefix').val(21);
    } else if (account_type == 'هزینه') {
        $('#Acount_number_prefix').val(22);
    } else if (account_type == 'درآمد') {
        $('#Acount_number_prefix').val(23);
    } else if (account_type == 'واسط قسط ها') {
        $('#Acount_number_prefix').val(24);
    } else if (account_type == 'واسط اعتبار فروش فروشگاه ها') {
        $('#Acount_number_prefix').val(25);
    }
}

$('#submit_form_pay').on('click', function () {
    // Prevent the form from submitting immediately
    // e.preventDefault();
    // Initialize the validation
    // $('#payment_form').validate({
    //     rules: {
    //         Issuetracking: {
    //             required: true,
    //             minlength: 4
    //         },
    //         nameofbank: {
    //             required: true
    //         },
    //         documentpayment: {
    //             required: true
    //         }
    //     },
    //     // Specify where to display error messages
    //     errorPlacement: function (error, element) {
    //         error.appendTo('#validation-messages');
    //     }
    // });
    // // Trigger the
    // $('#payment_form').attr('action', pay_url);
    // // $('#payment_form').valid();
    // console.log($('#payment_form').valid());

    $('#payment_form').attr('action', pay_url);
    $('#payment_form').submit();
});

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
