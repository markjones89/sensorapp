<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreaMapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('area_map', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('floor_id');
            $table->unsignedBigInteger('type_id');
            $table->string('name')->nullable();
            $table->integer('desks')->nullable();
            $table->integer('seats')->nullable();
            $table->longText('points');
            $table->double('scale');
            $table->timestamps();

            $table->foreign('floor_id')->references('id')->on('floors')->onDelete('cascade');
            $table->foreign('type_id')->references('id')->on('area_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('area_map');
    }
}
