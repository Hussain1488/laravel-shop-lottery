$(document).ready(function () {
    let table = $('#lottery_codes_table');
    $('#lottery_codes_table').DataTable({
        searching: true,
        processing: true,
        language: {
            url: window.Laravel.datatable_fa
        },
        ajax: {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: table.data('action'), // Replace with the actual URL of your data endpoint
            type: 'get'
        },
        serverSide: true,

        columns: [
            {data: 'counter', name: 'counter', title: '#'},
            {
                data: 'user',
                name: 'user',
                title: 'کاربر'
            },
            {
                data: 'code',
                name: 'code',
                title: 'کد قرعه کشی',
                searchable: false
            },
            {
                data: 'source',
                name: 'source',
                title: 'منبع کد',
                render: function (data) {
                    if (data == 'invoice') {
                        return (
                            '<span class="badge badge-success">' +
                            'فاکتور خرید' +
                            '</span>'
                        );
                    } else {
                        return (
                            '<span class="badge badge-info">' +
                            'کد روزانه' +
                            '</span>'
                        );
                    }
                },
                searchable: true
            },
            {
                data: 'weekly_state',
                name: 'weekly_state',
                title: 'وضعیت هفتگی',
                render: function (data) {
                    if (data == 0) {
                        return (
                            '<span class="badge badge-success">' +
                            'فعال' +
                            '</span>'
                        );
                    } else {
                        return (
                            '<span class="badge badge-danger">' +
                            'باطل' +
                            '</span>'
                        );
                    }
                },
                searchable: true
            },
            {
                data: 'monthly_state',
                name: 'monthly_state',
                title: 'وضعیت ماهانه',
                render: function (data) {
                    if (data == 0) {
                        return (
                            '<span class="badge badge-success">' +
                            'فعال' +
                            '</span>'
                        );
                    } else {
                        return (
                            '<span class="badge badge-danger">' +
                            'باطل' +
                            '</span>'
                        );
                    }
                },
                searchable: true
            },
            {
                data: 'button',
                name: 'button',
                title: 'عملیات',
                render: function (data) {
                    return (
                        '<input type="button" data-id="' +
                        data +
                        '" value="بیشتر"' +
                        ' class="lotteryCodeButton btn btn-info btn-sm" />'
                    );
                }
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
$(document).on('click', '.lotteryCodeButton', function () {
    let btn = $(this);
    alert(btn.data('id'));
});
