<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlobalCostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_costs', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->string('city');
            $table->double('rental_metre', 8, 2);
            $table->double('rental_foot', 8, 2);
            $table->double('furniture_cost', 8, 2);
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
        Schema::dropIfExists('global_costs');
    }
}
