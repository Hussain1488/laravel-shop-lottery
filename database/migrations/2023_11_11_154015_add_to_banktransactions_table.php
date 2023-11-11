<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddToBanktransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('banktransactions', function (Blueprint $table) {
            $table->unsignedBigInteger('pay_request_list_id')->nullable();
            $table->foreign('pay_request_list_id')->references('id')->on('list_of_payment');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('banktransactions', function (Blueprint $table) {
            //
        });
    }
}
