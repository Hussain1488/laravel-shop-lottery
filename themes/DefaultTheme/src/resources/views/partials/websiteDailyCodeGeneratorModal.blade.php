<div class="modal fade" id="websiteDailyCodeGeneratorModal">
    <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">
                    درخواست کد قرعه کشی
                </h4>
            </div>
            <hr />
            <!-- Modal body -->
            <div
                class="modal-body m-5 p-5 d-flex align-items-center justify-content-center "style="border:1px solid black">
                <div id="output"
                    style="border-radius: 5px;box-shadow: 0px 0px 8px rgba(255, 0, 0); background-color:rgba(0, 0, 0 ,0.5)"
                    class="p-3 m-4 border-r-4 border-s-4 bg-black"><span class="text-lg text-white m-1"
                        style="color:green;font-size:20px" id="RealNumber"></span><span class="text-lg text-red-700 m-1"
                        style="color:red;font-size:20px" id="RandomNumber"></span></div>
                <!-- Modal footer -->


                <div class="modal-footer">

                </div>

            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        $(document).on('click', '.websiteDailyCodeGeneratorButton', function() {
            $('#websiteDailyCodeGeneratorModal').modal();
            let RealNumber = ' 584623';
            let concatenatedNumber = '';
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
        });
    </script>
@endpush
