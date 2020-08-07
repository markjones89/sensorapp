<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            ['name' => 'Super Admin', 'created_at' => now()], // can access all sites & areas; issues registration & invites to Company Administrators
            ['name' => 'Company Administrator', 'created_at' => now()], // invite local users and other admins (of the same company); can add/edit sensors (sensor mapping); can use the widget functionality
            ['name' => 'Local User', 'created_at' => now()] // read-only access to all areas; can use reporting functionality
        ]);
    }
}
