$(document).ready(function () {
    $('.details-show').on('click', function () {
        console.log('AJAX URL: ' + $(this).data('action'));

        $.ajax({
            url: $(this).data('action'),
            type: 'GET',
            success: function (data) {
                // Parse the JSON string into a JavaScript object
                var responseData = JSON.parse(data);

                // Now you can access properties of the object
                console.log('ID: ' + responseData.id);
                console.log(
                    'Work Description: ' + responseData.workdescription
                );
            },
            error: function (xhr, status, error) {
                console.log('you have error');
            }
        });
    });
});
