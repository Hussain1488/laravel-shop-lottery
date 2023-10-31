$(document).ready(function () {
    //     $('#summit_button1').on('click', function () {
    //         console.log('hey');

    //         // e.preventDefault(); // Prevent the default form submission

    //         // let purchase_credit = $('#purchase_credit').val().replace(/,/g, '');
    //         // let inventory = $('#inventory').val().replace(/,/g, '');

    //         // // Update the form field values
    //         // $('#purchase_credit').val(purchase_credit);
    //         // $('#inventory').val(inventory);

    //         // // Submit the form after modifying the values
    //         // $('#createCredit').submit();

    //         // console.log('Form submitted'); // This will execute immediately, but the form will be submitted in the background.
    //     });

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
