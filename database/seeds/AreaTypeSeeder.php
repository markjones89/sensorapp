<?php

use Illuminate\Database\Seeder;

class AreaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('area_types')->insert([
            ['name' => 'Department', 'created_at' => now()],
            ['name' => 'Informal Meeting Spaces', 'created_at' => now()],
            ['name' => 'Meeting Rooms', 'created_at' => now()],
            ['name' => 'Workspace Desk Area', 'created_at' => now()]
        ]);
    }
}
