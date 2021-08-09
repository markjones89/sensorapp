<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSensorMapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sensor_map', function (Blueprint $table) {
            $table->longText('ref_id')->after('id'); // sensor id from sensor backend
            $table->dropForeign(['floor_id']);
            $table->dropColumn('floor_id');
            $table->dropColumn('area_id');
            $table->dropColumn('sensor_id');
            $table->dropColumn('name');
            $table->dropColumn('group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
