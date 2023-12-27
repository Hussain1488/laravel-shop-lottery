$(document).ready(function () {
    var bankId = $('#bank_data');
    console.log(bankId.data('action'));
    $('#bank_transaction_list').DataTable({
        searching: true,
        processing: true,
        language: {
            url: window.Laravel.datatable_fa
        },
        ajax: {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: bankId.data('action'), // Replace with the actual URL of your data endpoint
            type: 'POST',
            data: {
                bankId: bankId.val()
            }
        },
        serverSide: true,
        columnDefs: [
            {targets: [0, 4], orderable: false} // Disable sorting for columns 1 and 5 (indexes start from 0)
        ],
        columns: [
            {data: 'counter', name: 'counter', title: '#'},
            {
                data: 'user',
                name: 'user',
                title: 'کاربر'
            },
            {
                data: 'username',
                name: 'username',
                title: 'شماره تماس',

                searchable: true
            },
            {
                data: 'transactionprice',
                name: 'transactionprice',
                title: 'مبلغ تراکنش(ریال)',
                render: function (data) {
                    return (
                        '<span class="monyInputSpan">' +
                        parseFloat(data).toLocaleString() +
                        '</span>' +
                        ' ریال'
                    );
                },
                searchable: false
            },
            {
                data: 'bankbalance',
                name: 'bankbalance',
                title: 'موجودی حساب(ریال)',
                render: function (data) {
                    return (
                        '<span class="monyInputSpan">' +
                        parseFloat(data).toLocaleString() +
                        '</span>' +
                        ' ریال'
                    );
                },
                searchable: false
            },
            {
                data: 'transaction_date',
                name: 'transaction_date',
                title: 'تاریخ',
                render: function (data, type, row, meta) {
                    // Assuming 'date' and 'time' are properties of the 'transaction_date' object
                    var html_show =
                        '<span>' +
                        data.date +
                        '</span>' +
                        '<br />' +
                        '<span>' +
                        data.time +
                        '</span>';
                    return html_show;
                },
                searchable: false
            }
        ],

        select: 'single',
        drawCallback: function (settings) {
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
    function formatMoney(value) {
        return numeral(value).format('0,0');
    }

    $(function () {
        let a = $('#total_transaction').val();
        let sign = '';
        if (a < 0) {
            sign = '-';
        } else {
            sign = '';
        }

        let b = addCommas(a.replace(/\D/g, ''));
        $('#total_transaction').val(sign + b);
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
