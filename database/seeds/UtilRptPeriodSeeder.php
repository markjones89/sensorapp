<?php

use Illuminate\Database\Seeder;

class UtilRptPeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('util_report_periods')->insert([
            ['name' => 'Weekly', 'created_at' => now()],
            ['name' => 'Monthly', 'created_at' => now()],
            ['name' => 'Quarterly', 'created_at' => now()]
        ]);
    }
}
