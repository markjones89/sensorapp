<?php

use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            ['name' => 'Netflix', 'created_at' => now()],
            ['name' => 'Google', 'created_at' => now()]
        ]);
    }
}
