<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSensorMapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sensor_map', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('floor_id');
            $table->unsignedBigInteger('area_id')->nullable();
            $table->string('sensor_id');
            $table->string('name')->nullable();
            $table->string('group_id')->nullable();
            $table->integer('pos_x')->unsigned();
            $table->integer('pos_y')->unsigned();
            $table->double('scale');
            $table->timestamps();

            $table->foreign('floor_id')->references('id')->on('floors')->onDelete('cascade');
            // $table->foreign('area_id')->references('id')->on('area_map');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sensor_map');
    }
}
