<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Machines',
            'phone'=> '0546737765',
            'email' => 'machines@email.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);
        User::factory()->create([
            'name' => 'Samuel',
            'phone'=> '0542013553',
            'email' => 'samuel@email.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);
    }
}
