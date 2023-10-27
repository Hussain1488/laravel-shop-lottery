$(document).ready(function () {
    $('#summit_button').on('click', function (e) {
        e.preventDefault(); // Prevent the default form submission

        let moneyInput = $('#moneyInput');
        let money = moneyInput.val();
        let money_changed = money.replace(/,/g, '');
        moneyInput.val(money_changed);

        // console.log(moneyInput.val());
        $('#store_create_form').submit();
    });

    $('#moneyInput').on('input', function () {
        // console.log('hey');
        var input = $(this).val();
        var digits = input.replace(/\D/g, '');
        var formattedNumber = addCommas(digits);
        $(this).val(formattedNumber);
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
});
