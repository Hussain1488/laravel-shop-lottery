<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreatestoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('createstores', function (Blueprint $table) {
            $table->id();
            $table->string('selectperson');
            $table->string('uploaddocument');
            $table->string('nameofstore');
            $table->string('addressofstore');
            $table->string('feepercentage');
            $table->date('enddate');
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
        Schema::dropIfExists('createstores');
    }
}
