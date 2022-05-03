<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table("users")->truncate();
        Schema::enableForeignKeyConstraints();

        $users = [
            [
                "first_name" => "Lil",
                "last_name"  => "Nabz",
                "email"      => "nabcellent.dev@yopmail.com",
                "phone"      => 110039317,
                "gender"     => "male",
            ]
        ];

        $users = array_map(fn($user) => [
            ...$user,
            "password"          => Hash::make(12345678),
            "email_verified_at" => now(),
            "created_at"        => now(),
            "updated_at"        => now()
        ], $users);

        DB::table("users")->insert($users);
    }
}
