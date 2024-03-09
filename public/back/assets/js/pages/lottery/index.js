$(document).ready(function () {
    let table = $('#lottery_codes_table');
    console.log(table.data('action'));
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
                searchable: true
            },
            {
                data: 'weekly_state',
                name: 'weekly_state',
                title: 'وضعیت هفتگی',
                searchable: true
            },
            {
                data: 'monthly_state',
                name: 'monthly_state',
                title: 'وضعیت ماهانه',
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
