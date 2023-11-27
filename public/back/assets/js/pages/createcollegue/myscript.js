// const {last} = require('lodash');

$(document).ready(function () {
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

    $('.imageInput').on('change', function (e) {
        // Get the selected files
        var files = e.target.files;

        if (files && files.length > 0) {
            // Clear existing images
            $('.imgContainer').empty();

            // Loop through each selected file
            for (var i = 0; i < files.length; i++) {
                // Create a FileReader for each file
                var reader = new FileReader();

                // Set the callback function to display the image after reading
                reader.onload = function (event) {
                    // Create an image element
                    var image = $('<img>')
                        .attr('src', event.target.result)
                        .css({
                            'max-width': '100px',
                            border: '2px solid #ccc',
                            margin: '5px',
                            'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)',
                            display: 'inline'
                        });

                    // Append the image to the container
                    $('.imgContainer').append(image);
                };

                reader.readAsDataURL(files[i]);
            }
        }
    });
});
