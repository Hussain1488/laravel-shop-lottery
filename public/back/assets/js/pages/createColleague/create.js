$(document).ready(function () {
    $('#summit_button1').on('click', function (e) {
        e.preventDefault();

        let purchase_credit = $('#purchase_credit').val().replace(/,/g, '');

        $('#purchase_credit').val(purchase_credit);

        $('#createCredit').submit();
    });

    $('#User_selected').change(function () {
        var selectedOption = $(this).find(':selected');
        var creditAttrValue = selectedOption.attr('credit_attr_value');
        // console.log(creditAttrValue);
        // var orginal_value = selectedOption.attr('creadit_attr');

        if (creditAttrValue == '') {
            creditAttrValue = 0;
        }
        var formattedNumber = addCommas(creditAttrValue);
        $('#inventory').val(formattedNumber);
        $('#Creadit_hidden').val(creditAttrValue);
    });

    $('.monyInputSpan').each(function () {
        var input = $(this).text();
        var digits = input.replace(/\D/g, '');
        var formattedNumber = addCommas(digits);
        $(this).text(formattedNumber);
    });
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

$('#user_selection').change(function () {
    let selectedOption = $(this).find(':selected');
    let name = selectedOption.attr('data-name');
    let lastname = selectedOption.attr('data-lastname');
    $('#user_title').text('کاربر:' + ' ');
    $('#user_name').text(name + ' ' + lastname);
    // console.log(name + ' ' + lastname);
});
