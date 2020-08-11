<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuildingInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('building_info', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('building_id');
            $table->double('rental_metre', 8, 2);
            $table->double('rental_foot', 8, 2);
            $table->double('furniture_cost', 8, 2);
            $table->integer('people_alloc')->unsigned();
            $table->timestamps();

            $table->foreign('building_id')->references('id')->on('locations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('building_info');
    }
}
