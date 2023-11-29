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

    $('#each_pay').val(0);
    if ($('#cash_status').val() == 'cash') {
        $('#main_price').on('change', function () {
            let payment = $('#main_price').val();
            $('#prepayment').val(payment);
            $('#each_pay').val(0);
        });
    }

    $('#cash_status').on('change', function () {
        var cash_status = $('#cash_status').val();

        if (cash_status == 'installment') {
            $('#payment').prop('disabled', false);

            // $('#payment').on('change', function () {

            updatePayment();
        } else {
            $('#payment').prop('disabled', true);
            $('#payment').val($('#payment option:first').val());
            var payment1 = $('#main_price').val();
            // console.log(payment1);
            $('#prepayment').val(payment1);
            $('#each_pay').val(0);
        }
    });
    $('#main_price').on('input', function () {
        if ($('#cash_status').val() == 'installment') {
            updatePayment();
        }
    });
    $('#payment').on('change', function () {
        if ($('#cash_status').val() == 'installment') {
            updatePayment();
        }
    });

    function updatePayment() {
        let payment = parseFloat($('#main_price').val().replace(/,/g, ''));
        let installment = parseFloat($('#payment').val());
        let total_pay = payment + payment * (30 / 100);
        let prepayment = total_pay * 0.3;
        let rest_pay = total_pay - prepayment;
        let each_pay = Math.round(rest_pay / $('#payment').val());
        $('#prepayment').val(addCommas(prepayment));
        $('#each_pay').val(addCommas(each_pay));
        // console.log(total_pay);
    }

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

    $('.persian-date-picker').customPersianDate();

    if ($('#user_select').find('option').length === 1) {
        selectElement.find('option:first').prop('selected', true);
        var creditAttrValue1 = selectedOption.attr('creadit_attr');
        var formattedNumber1 = addCommas(creditAttrValue1);
        $('#purchase_creadite').val(formattedNumber1);
    }

    $('#user_select').change(function () {
        var selectedOption = $(this).find(':selected');
        var creditAttrValue = selectedOption.attr('creadit_attr');
        // var orginal_value = selectedOption.attr('creadit_attr');

        let name = selectedOption.attr('data-name');
        let lastname = selectedOption.attr('data-lastname');
        $('#user_title').text(':');
        $('#user_name').text(name + ' ' + lastname);

        if (creditAttrValue == '') {
            creditAttrValue = 0;
        }
        var formattedNumber = addCommas(creditAttrValue);
        $('#purchase_creadite').val(formattedNumber);
        // $('#Creadit_hidden').val(orginal_value);
    });

    $('#submit_button').click(function () {
        // Get the values of input fields

        let end_date = new Date($(this).attr('data-end-date'));

        var creadit = parseInt(
            $('#purchase_creadite').val().replace(/,/g, ''),
            10
        );

        // console.log(creadit);
        $('#purchase_creadite').val();
        var main_price = $('#main_price').val().replace(/,/g, '');
        var store_creadit = parseFloat($('#store_creadit').val());
        let toDay = new Date();
        console.log(store_creadit, main_price, store_creadit >= main_price);
        if (toDay <= end_date) {
            if (main_price == '' || isNaN(main_price) || main_price <= 0) {
                // console.log('this is NaN');
                $('#myModal3').modal();
            } else {
                if (store_creadit >= main_price) {
                    if (creadit >= main_price) {
                        $('#user-create-form').submit();
                    } else {
                        // If the condition is not met, show a confirmation dialog
                        $('#modal_body').html(
                            '<p>' +
                                'مقدار قیمت اصلی نباید از اعتبار خریدار بیشتر باشد.' +
                                '<br />' +
                                'لطفا اصلاح کنید بعد تآیید و ارسال کنید.' +
                                '</p>'
                        );
                        $('#myModal').modal();

                        // Close the popup when the close button is clicked
                    }
                } else {
                    $('#store_creadit2').text(store_creadit);
                    $('#myModal2').modal();
                }
            }
        } else {
            $('#modal_body').html(
                '<p>' +
                    'مهلت اعتبار فروشگاه شما به اتمام رسیده است و شما نمیتوانید قسطی ایجاد کنید' +
                    '</p>'
            );
            $('#myModal').modal();
        }
    });

    $('.user_select2').select2();

    $('.settlementtime_button').click(function () {
        let data_day = $(this).attr('data_day');
        let data_date = $(this).attr('data_date');
        let new_date = $('#new_date').val();

        let dateA = new Date(data_date);
        let dateNew = new Date(new_date);

        let timeDifference = dateNew.getTime() - dateA.getTime();
        let daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        var DaysDiff = parseInt(daysDifference);
        var data_date_update = parseInt(data_day);

        if (data_date_update >= DaysDiff) {
            console.log('if');
            let time = data_date_update - DaysDiff + 1;
            $('#user_day_time').text(time);
            $('#myModal').modal();
        } else {
            window.location.href = $(this).attr('data-route');
        }
    });

    // console.log(user);
});

$('#clearing_button').on('click', function () {
    let total_amount = parseFloat($('#total_amount').val().replace(/\D/g, ''));
    let reqest_amount = parseFloat(
        $('#reqest_amount').val().replace(/\D/g, '')
    );
    let shaba_number = $('#shaba_number').val();
    let digitPattern = /^\d{16}$/;

    if (total_amount >= reqest_amount) {
        if (reqest_amount <= 0) {
            $('.modal-body').html(
                '<p>' + 'مقدار درخواست واریز معتبر نمیباشد' + '</p>'
            );
            $('#myModal').modal();
        } else {
            if (digitPattern.test(shaba_number)) {
                $('#reqest_amount').val(reqest_amount);
                // console.log($('#reqest_amount').val());
                $('#clearing_form').submit();
            } else {
                $('.modal-body').html(
                    '<p>' +
                        'شماره ثبت شبا درست نمیباشد،‌لطفا اصلاح کرده دوباره امتهان کنید.' +
                        '</p>'
                );
                $('#myModal').modal();
            }
        }
    } else {
        let a = $('#total_amount').val();
        $('.modal-body').html(
            '<p>' +
                'شما نمیتوانید از موجودی قابل برداشت خود بیشتر درخواست بدهید.' +
                '<br />' +
                ' موجودی قابل برداشت شما فعلا:' +
                '<span class="text-success" id="total_amount_text" >' +
                '</span> ' +
                ' ریال میباشد.' +
                '</p>'
        );
        $('#total_amount_text').text(a);
        $('#myModal').modal();
    }
});

$('.user_selection').change(function () {
    let selectedOption = $(this).find(':selected');
    let name = selectedOption.attr('data-name');
    let lastname = selectedOption.attr('data-lastname');
    $('.user_title').text('کاربر:' + ' ');
    $('.user_name').text(name + ' ' + lastname);
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
