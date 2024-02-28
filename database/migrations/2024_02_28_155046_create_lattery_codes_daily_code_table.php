<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLatteryCodesDailyCodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lattery_codes_daily_code', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lattery_code_id');
            $table->unsignedBigInteger('daily_code_id');
            $table->timestamps();

            $table->foreign('lattery_code_id')->references('id')->on('lattery_codes')->onDelete('cascade');
            $table->foreign('daily_code_id')->references('id')->on('daily_code')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lattery_codes_daily_code');
    }
}
