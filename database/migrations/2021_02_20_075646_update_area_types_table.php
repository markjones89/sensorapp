<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateAreaTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('area_types', function (Blueprint $table) {
            $table->integer('trigger_filter')->nullable()->after('name'); // minutes
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('area_types', function (Blueprint $table) {
            $table->dropColumn('trigger_filter');
        });
    }
}
