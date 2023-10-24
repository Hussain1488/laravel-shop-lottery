<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMakeinstallmentsmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('makeinstallmentsms', function (Blueprint $table) {
            $table->id();
            $table->boolean('status');
            $table->integer('Creditamount');
            $table->string('userselected');
            $table->string('typeofpayment');
            $table->string('numberofinstallments');
            $table->string('prepaidamount');
            $table->string('amounteachinstallment');
            $table->boolean('buyerstatus');
            $table->boolean('paymentstatus');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('makeinstallmentsms');
    }
}
