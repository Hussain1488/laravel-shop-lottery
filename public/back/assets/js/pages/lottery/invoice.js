$(document).ready(function () {
    // $('.image_modal').modal();
    let table = $('#invoice_code_table');
    console.log(table.attr('action'));
    $('#invoice_code_table').DataTable({
        searching: true,
        processing: true,
        language: {
            url: window.Laravel.datatable_fa
        },
        ajax: {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: table.attr('action'), // Replace with the actual URL of your data endpoint
            type: 'POST'
        },
        serverSide: true,

        columnDefs: [
            {targets: [0, 1, 2, 3, 4, 5], orderable: false} // Disable sorting for columns 1 and 5 (indexes start from 0)
        ],
        columns: [
            {data: 'counter', name: 'counter', title: '#'},
            {
                data: 'date',
                name: 'date',
                title: 'تاریخ'
            },
            {
                data: 'number',
                name: 'number',
                title: 'شماره فاکتور',

                searchable: true
            },
            {
                data: 'amount',
                name: 'amount',
                title: 'مبلغ خرید',
                searchable: true
            },
            {
                data: 'image',
                name: 'image',
                title: 'عکس فاکتور',
                render: function (data, row) {
                    return (
                        '<input type="button" class="btn btn-info btn-sm invoiceImageShow" data-src="' +
                        data +
                        '" value="نمایش" id="">'
                    );
                },
                searchable: true
            },
            {
                data: 'state',
                name: 'state',
                title: 'وضعیت',
                render: function (data, row, type) {
                    if (data == 'pending') {
                        return '<span class="badge badge-primary">انتظار تأیید</span>';
                    } else if (data == 'valid') {
                        return '<span class="badge badge-success">تأیید شده</span>';
                    } else {
                        return '<span class="badge badge-danger">رد شده</span>';
                    }
                },
                searchable: true
            },
            {
                data: 'action',
                name: 'action',
                title: 'پاسخ',
                render: function (data, type, row) {
                    if (row.state != 'valid') {
                        return (
                            '<input type="button" data-id="' +
                            data +
                            '" value="بیشتر"' +
                            ' class="invoiceActionButton btn btn-info btn-sm" />'
                        );
                    } else {
                        // Handle the case where the state is 'valid'
                        return ''; // Return an empty string or null
                    }
                },
                searchable: true
            }
        ],
        select: 'single',
        drawCallback: function (settings) {
            // console.log('Draw callback executed');
            // Reset the counter on each page change
            var api = this.api();
            var rows = api.rows({page: 'current'}).nodes();
            var last = null;
            var counter = api.page.info().start + 1; // Start counter from the correct number

            api.column(0, {page: 'current'})
                .data()
                .each(function (group, i) {
                    if (last !== group) {
                        counter = api.page.info().start + 1;
                    }

                    $(rows).eq(i).find('td:eq(0)').html(counter);
                    counter++;

                    last = group;
                });
        }
    });
});

$(document).on('click', '.invoiceActionButton', function () {
    let btn = $(this);
    $('#selectedInvoice').val(btn.data('id'));
    $('#validationChicking').modal();
});

$('.validationValidateButton').on('click', function () {
    // console.log($('#selectedInvoice').val()); // Retrieve the data attribute value
    $('#validationChicking').modal('hide');
    $('#validationValidateModal').modal();
});

$(document).on('click', '.validationRejectButton', function () {
    let btn = $('.validationRejectButton');
    $.ajax({
        url: rejectionUrl + '/' + $('#selectedInvoice').val(),
        type: 'get',

        success: function (response) {
            if (response.status == 'success') {
                // $('#validationValidateModal').modal('hide');
                toastr.success(response.data);
                $('#invoice_code_table').DataTable().ajax.reload();
            } else {
                // $('#validationValidateModal').modal('hide');
                toastr.error(response.data);
            }
            // Handle successful response
        },
        beforeSend: function (xhr) {
            block(btn);
        },
        complete: function () {
            $('#validationChicking').modal('hide');
            unblock(btn);
        }
    });
});
$('#invoiceValidationButton').on('click', function () {
    let btn = $(this);
    let formData = $('#invoiceValidationForm').serialize();
    $.ajax({
        url: validationUrl + '/' + $('#selectedInvoice').val(),
        type: 'post',
        data: formData,
        success: function (response) {
            if (response.status == 'success') {
                toastr.success(response.data);
                $('#invoice_code_table').DataTable().ajax.reload();
            } else {
                toastr.error(response.data);
            }
        },
        beforeSend: function (xhr) {
            block(btn);
        },
        complete: function () {
            $('#validationValidateModal').modal('hide');
            unblock(btn);
        }
    });
});

$(document).on('click', '.invoiceImageShow', function () {
    console.log($(this).data('src'));
    $('#invoiceImage').attr('src', $(this).data('src'));
    $('.image_modal').modal();
});
