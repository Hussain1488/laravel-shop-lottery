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
                let payment = parseFloat($('#totalMoney').val()); // Replace with the desired value
                let installment = parseFloat($('#payment').val());
                let total_pay = payment + payment * (30 / 100);
                let prepayment = total_pay * 0.3;
                let rest_pay = total_pay - prepayment;
                let each_pay = Math.round(rest_pay / $('#payment').val());
                $('#prepayment').val(prepayment);
                $('#each_pay').val(each_pay);
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
});
