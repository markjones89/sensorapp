<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('user_roles', function (Blueprint $table) {
        //     $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade');
        //     $table->foreignId('role_id')->constrained('roles', 'id')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('user_roles');
    }
}
