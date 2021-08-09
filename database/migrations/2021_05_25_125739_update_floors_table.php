<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateFloorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('floors', function (Blueprint $table) {
            $table->dropColumn('floor_no');
            $table->dropColumn('size_metre');
            $table->dropColumn('size_feet');
            $table->longText('building_id')->after('id'); // building from sensor backend
            $table->longText('ref_id')->after('building_id'); // floor id from sensor backend
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
