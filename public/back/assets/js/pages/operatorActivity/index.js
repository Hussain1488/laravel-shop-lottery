$(document).ready(function () {
    $('.details-show').on('click', function () {
        console.log('AJAX URL: ' + $(this).data('action'));
        let date = $(this).data('date');
        let time = $(this).data('time');

        $.ajax({
            url: $(this).data('action'),
            type: 'GET',
            success: function (data) {
                console.log(data);
                var activityData = data.data;
                var detailsData = data.details.data;

                // Populate modal with data
                // $('#activity_details').modal();

                // Clear existing content in modal body
                $('.modal-body').html('');

                // Display work description in modal body
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
});
