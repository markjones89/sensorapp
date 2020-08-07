<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'company_id' => null,
                'name' => 'Dionlee Uy', 
                'email' => 'dionleeuy@gmail.com', 
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
                'email_verified_at' => now(),
                'role_id' => 1
            ], [
                'company_id' => 1,
                'name' => 'Dionisio Uy', 
                'email' => 'dionleeuy@yahoo.com', 
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
                'email_verified_at' => now(),
                'role_id' => 2
            ]
        ]);

        // DB::table('user_roles')->insert([
        //     ['user_id' => 1, 'role_id' => 1]
        // ]);
    }
}
