<div class="modal fade" id="websiteDailyCodeGeneratorModal">
    <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header d-flex justify-content-center m-3"
                style="border-radius: 5px; background-color:rgba(128, 228, 141, 0.5)">
                <h4 class="modal-title">
                    تولید کد روزانه بلیط قرعه کشی
                </h4>
            </div>
            <hr />
            <!-- Modal body -->
            <div class="modal-body m-5 p-5 d-flex align-items-center justify-content-center "style="">
                <div id="output"
                    style="border-radius: 5px;box-shadow: 0px 0px 8px rgba(0, 255, 0); background-color:rgba(0, 0, 0 ,0.5)"
                    class="p-3 m-4 bg-black">
                    <button type="butotn" class="btn btn-info btn-sm mx-2 d-none codeCopyBtn">کپی کد!</button>
                    <div class="copy-message">کپی شد!</div> <span class="text-lg text-white m-1"
                        style="color:green;font-size:20px" id="RealNumber"></span><span class="text-lg text-red-700 m-1"
                        style="color:red;font-size:20px" id="RandomNumber"></span>
                </div>
                <!-- Modal footer -->


                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        $(document).on('click', '.getCode-button', function() {
            $('#websiteDailyCodeGeneratorModal').modal();
            $('#rollDiceModal').modal('hide');
            let RealNumber = ' ' + $('#dailyCodeSite').val();
            let concatenatedNumber = '';
            $('.codeCopyBtn').addClass('d-none');
            // generatRandomNumber();


            function displayCharacters() {
                for (let i = 0; i < RealNumber.length; i++) {
                    setTimeout(() => {
                        concatenatedNumber += RealNumber.charAt(
                            i); // Concatenate each character to the variable
                        $('#RealNumber').text(concatenatedNumber) // Display concatenated string
                    }, 4000 * i + 1); // Show each character after 3 seconds
                }
            }

            // Call the function to start displaying characters
            generatRandomNumber();
            displayCharacters();
            codeCopyBtn();



            function generatRandomNumber() {
                function generateRandomNumber() {
                    return Math.floor(Math.random() * 10); // Generate random number between 0 and 9
                }

                function updateNumber() {
                    const outputDiv = $('#RandomNumber');
                    outputDiv.text(generateRandomNumber()); // Update output with random number
                }

                // Update number rapidly every 70 milliseconds
                const interval = setInterval(updateNumber, 100);

                // Stop updating after 3 seconds
                setTimeout(function() {
                    clearInterval(interval);
                    $('#RandomNumber').text('');
                }, 24000);
            }

            function codeCopyBtn() {
                setTimeout(() => {
                    $('.codeCopyBtn').removeClass('d-none');
                }, 24000);
            }
            $('.codeCopyBtn').on('click', function() {
                copyToClipboard($('#dailyCodeSite').val());
                $('.copy-message').show(500);

                setTimeout(() => {
                    $('.copy-message').hide(500);
                }, 2000);
            });

        });
    </script>
@endpush
