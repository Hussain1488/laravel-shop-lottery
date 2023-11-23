// const {last} = require('lodash');

$(document).ready(function () {
    // // console.log($('.persian-date-picker-value').val().pDatepicker());
    // $('.persian-date-picker-value').pDatepicker({
    //     altFormat: 'YYYY-mm-dd',
    //     time: {
    //         enabled: false
    //     },
    //     minute: {
    //         enabled: false
    //     }
    // });
    // // $('.persian-date-picker-value').customPersianDate();
    // $('#summit_button').on('click', function (e) {
    //     e.preventDefault(); // Prevent the default form submission
    //     var persianDate = $('#enddate_persian').val();

    //     // Use moment.js to parse and format the date
    //     var formattedDate = moment(persianDate, 'YYYY-M-D').format('YY-M-D');

    //     // Update the value of the date input with the formatted date
    //     $('#enddate_persian').val(formattedDate);

    //     $('#store_create_form').submit();
    // });

    $('#summit_button').on('click', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var persianDate = $('#enddate_persian').val();

        $('#store_create_form').submit();
    });
    $('#summit_button1').on('click', function (e) {
        e.preventDefault(); // Prevent the default form submission
        // console.log('hey');
        let moneyInput = $('#recredition_amount');
        let money = moneyInput.val();
        let money_changed = money.replace(/,/g, '');
        moneyInput.val(money_changed);
        // console.log(moneyInput.val());

        $('#reaccreditationStoreForm').submit();
    });
    $('#submit_button2').on('click', function (e) {
        e.preventDefault(); // Prevent the default form submission
        let moneyInput1 = $('#ReCredintAmount');
        let money = moneyInput1.val();
        let money_changed1 = money.replace(/,/g, '');
        moneyInput1.val(money_changed1);

        $('#colleagueDocumentStore').submit();
    });

    $('.moneyInput').on('input', function () {
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
    $('.select2').select2();

    $('#enddate_field').ready(function () {});

    $('#user_selection').change(function () {
        let selectedOption = $(this).find(':selected');
        let name = selectedOption.attr('data-name');
        let lastname = selectedOption.attr('data-lastname');
        $('#user_title').text('کاربر:' + ' ');
        $('#user_name').text(name + ' ' + lastname);
        // console.log(name + ' ' + lastname);
    });
});
