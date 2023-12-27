$(document).ready(function () {
    var operatorId = $('#operato-id').val();
    $('#operatorActivity').DataTable({
        searching: true,
        processing: true,
        language: {
            url: window.Laravel.datatable_fa
        },
        ajax: {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: $('#operato-id').data('action'), // Replace with the actual URL of your data endpoint
            type: 'POST',
            data: {
                operator_id: operatorId
            }
        },
        serverSide: true,
        columnDefs: [
            {targets: [0, 4], orderable: false} // Disable sorting for columns 1 and 5 (indexes start from 0)
        ],
        columns: [
            {data: 'counter', name: 'counter', title: '#'},
            {
                data: 'workdescription',
                name: 'workdescription',
                title: 'عملیات'
            },
            {
                data: 'username',
                name: 'username',
                title: 'گیرنده فعالیت',

                searchable: true
            },
            {
                data: 'formatted_date',
                name: 'created_at',
                title: 'تاریخ',
                searchable: false
            },
            {
                data: 'details_action', // Assuming 'details_action' contains button attributes
                name: 'details_action',
                title: 'جزئیات',
                render: function (data, type, row, meta) {
                    if (type === 'display') {
                        // Construct HTML for the button
                        var buttonHTML =
                            '<button data-action="' +
                            row.details_action.data_action +
                            '" data-time="' +
                            row.details_action.data_time +
                            '" data-date="' +
                            row.details_action.data_date +
                            '" class="btn details-show"><i class="text-success feather icon-info"></i></button>';
                        return buttonHTML;
                    }
                    return data;
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
            // this.api().processing(false);
        }
    });

    $('#operator_list').DataTable({
        searching: true,
        processing: true,
        language: {
            url: window.Laravel.datatable_fa
        }
    });

    $(document).on('click', '.details-show', function () {
        let date = $(this).data('date');
        let time = $(this).data('time');

        $.ajax({
            url: $(this).data('action'),
            type: 'GET',
            success: function (data) {
                console.log(data);
                var activityData = data.data;
                var detailsData = data.details.data;

                $('.modal-body').html('');

                $('.modal-body').append(
                    '<p><strong>عملیات:</strong> ' +
                        activityData.workdescription +
                        '</p>'
                );
                // Iterate through detailsData and create a list in modal body
                $('.modal-body').append('<ul>');
                for (var key in detailsData) {
                    if (detailsData.hasOwnProperty(key)) {
                        $('.modal-body ul').append(
                            '<li class="mt-1"><strong>' +
                                key +
                                ':</strong> ' +
                                detailsData[key] +
                                '</li>'
                        );
                    }
                }
                $('.modal-body').append('</ul>');
                $('.modal-body').append(
                    '<p class="mt-1"><strong>تاریخ:</strong> ' +
                        date +
                        '</p>' +
                        '<p class="mt-1"><strong>زمان:</strong> ' +
                        time +
                        '</p>'
                );
                $('#activity_details').modal();
            }
        });
    });
    $('.details-show').on('click', function () {});
});
