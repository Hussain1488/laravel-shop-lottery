<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDateDatatypesToString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('buyertransactions', function (Blueprint $table) {
        //     $table->string('datetransaction')->change();
        // });
        // Schema::table('createstoretransactions', function (Blueprint $table) {
        //     $table->string('datetransaction')->change();
        // });
        // Schema::table('list_of_payment', function (Blueprint $table) {
        //     $table->string('depositdate')->change();
        // });
        // Schema::table('banktransactions', function (Blueprint $table) {
        //     $table->string('transactionsdate')->change();
        // });
        // Schema::table('installmentdetails', function (Blueprint $table) {
        //     $table->string('duedate')->change();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('string', function (Blueprint $table) {
            //
        });
    }
}
