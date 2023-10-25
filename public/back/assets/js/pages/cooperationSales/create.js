$(document).ready(function () {
    $('#each_pay').val(0);
    if ($('#cash_status').val() == 'cash') {
        $('#totalMoney').on('change', function () {
            let payment = $('#totalMoney').val();
            $('#prepayment').val(payment);
            $('#each_pay').val(0);
        });
    }
    $('#cash_status').on('change', function () {
        var cash_status = $('#cash_status').val();

        if (cash_status == 'installment') {
            $('#payment').prop('disabled', false);

            $('#payment').on('change', function () {
                let payment = parseFloat(
                    $('#totalMoney').val().replace(/,/g, '')
                );
                let installment = parseFloat($('#payment').val());
                let total_pay = payment + payment * (30 / 100);
                let prepayment = total_pay * 0.3;
                let rest_pay = total_pay - prepayment;
                let each_pay = Math.round(rest_pay / $('#payment').val());
                $('#prepayment').val(addCommas(prepayment));
                $('#each_pay').val(addCommas(each_pay));
                // console.log(total_pay);
            });
        } else {
            $('#payment').prop('disabled', true);
            $('#payment').val($('#payment option:first').val());
            var payment1 = $('#totalMoney').val();
            // console.log(payment1);
            $('#prepayment').val(payment1);
            $('#each_pay').val(0);
        }
    });

    $('#payment').on('change', function () {
        var payment = $('#totalMoney').val();
        var pay_status = $('#pay_status').val(); // Replace with the desired value

        if (pay_status == 'installment') {
        }

        $('#prepayment').val(payment);
    });

    $('.custom-file-input').on('change', function () {
        var fileName = $(this).val();
        $(this).next('.custom-file-label').html(fileName);
    });

    $('#payment');

    $('.moneyInput').on('input', function () {
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
});
