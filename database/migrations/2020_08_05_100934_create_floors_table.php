<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFloorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('floors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('building_id');
            $table->integer('floor_no')->unsigned();
            $table->double('size_metre', 8, 2);
            $table->double('size_feet', 8, 2);
            $table->integer('occupancy_limit')->unsigned();
            $table->string('floor_plan')->nullable();
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
        Schema::dropIfExists('floors');
    }
}
