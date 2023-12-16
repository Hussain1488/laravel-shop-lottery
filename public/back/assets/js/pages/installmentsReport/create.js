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
    $('.imageInput').on('change', function (e) {
        // Get the selected files
        var files = e.target.files;

        if (files && files.length > 0) {
            // Clear existing images
            $('.imgContainer').empty();

            // Loop through each selected file
            for (var i = 0; i < files.length; i++) {
                // Check if the file is an image
                if (files[i].type.startsWith('image/')) {
                    // If it's an image, create a FileReader to display the image
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
                } else {
                    // If it's not an image, just display the file name
                    var fileName = $('<span>').text(files[i].name).css({
                        border: '2px solid #ccc',
                        padding: '5px',
                        margin: '5px',
                        'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)',
                        display: 'inline-block'
                    });

                    // Append the file name to the container
                    $('.imgContainer').append(fileName);
                }
            }
        }
    });
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
    } else if (account_type == 'مقدار اعتبار خرید خریدارها') {
        $('#Acount_number_prefix').val(26);
    }
}

$('#submit_form_pay').on('click', function () {
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
$('.account_selection').change(function () {
    let selectedOption = $(this).find(':selected');
    let name = selectedOption.attr('attr-name');
    $('.account-title').text('حساب:' + ' ');
    $('.account-name').text(name);
});

$('.transaction_details').on('click', function () {
    $.ajax({
        url: $(this).data('action'),
        type: 'GET',
        success: function (data) {
            console.log(data);
            var detailsData = data;
            $('.modal-body').empty();

            var $ul = $('<ul>'); // Create a ul element
            for (var key in detailsData) {
                if (detailsData.hasOwnProperty(key)) {
                    $ul.append(
                        '<li class="pb-1"><strong>' +
                            key +
                            '</strong> ' +
                            detailsData[key] +
                            '</li>'
                    );
                }
            }
            $('.modal-body').append($ul); // Append the ul element
            $('.transaction_details_modal').modal();
        }
    });
});
