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
            {targets: [0, 1, 2, 4], orderable: false} // Disable sorting for columns 1 and 5 (indexes start from 0)
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
                            '" class="btn btn-info btn-sm details-show waves-effect waves-light">بیشتر<i class="feather icon-info"></i></button>';
                        return buttonHTML;
                    }
                    return data;
                },
                searchable: false
            }
        ],
        select: 'single',
        order: [[3, 'desc']],
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
        let btn = $(this);

        $.ajax({
            url: $(this).data('action'),
            type: 'GET',
            success: function (data) {
                console.log(data);
                var activityData = data.data;
                var detailsData = data.details.data;

                $('.modal-body').html('');
                var contentDiv = $('<div></div>');
                contentDiv.append(
                    '<div class="row"><div class="col-4"><strong>عملیات:</strong></div><div class="col-8"> ' +
                        activityData.workdescription +
                        '</div></div>'
                );
                var list = $('<ul></ul>');

                // Iterate through detailsData and create list items
                for (var key in detailsData) {
                    if (detailsData.hasOwnProperty(key)) {
                        list.append(
                            '<li class="mt-1"><div class="row"><div class="col-4"><strong>' +
                                key +
                                ':</strong></div><div class="col-8"> ' +
                                detailsData[key] +
                                '</div></div></li>'
                        );
                    }
                }

                // Append the list to the content div
                contentDiv.append(list);

                // Append content for activityData

                // Append additional content to the modal body
                contentDiv.append(
                    '<p class="mt-1"><div class="row"><div class="col-4"><strong>تاریخ:</strong></div><div class="col-8"> ' +
                        date +
                        '</div></div></p>' +
                        '<p class="mt-1"><div class="row"><div class="col-4"><strong>زمان:</strong></div><div class="col-8"> ' +
                        time +
                        '</div></div></p>'
                );

                // Append the content div to the modal body
                $('.modal-body').append(contentDiv);

                $('#activity_details').modal();
            },
            beforeSend: function (xhr) {
                block(btn);
            },
            complete: function () {
                unblock(btn);
            }
        });
    });
    $('.details-show').on('click', function () {});
});
