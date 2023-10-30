<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreatedocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('createdocuments', function (Blueprint $table) {
            $table->id();
            $table->string('namedebtor')->nullable();
            $table->string('namecreditor')->nullable();
            $table->bigInteger('price')->nullable();
            $table->string('documents')->nullable();
            $table->bigInteger('numberofdocuments')->nullable();
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
        Schema::dropIfExists('createdocuments');
    }
}
