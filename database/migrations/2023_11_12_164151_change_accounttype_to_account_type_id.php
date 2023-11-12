<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeAccounttypeToAccountTypeId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('createbankaccounts', function (Blueprint $table) {


            $table->unsignedBigInteger('account_type_id')->change();
            $table->foreign('account_type_id')->references('id')->on('type_of_account')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('account_type_id', function (Blueprint $table) {
            //
        });
    }
}
