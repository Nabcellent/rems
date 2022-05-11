<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
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
            ],
            [
                "first_name" => "Khalifa",
                "last_name"  => "Fumo",
                "email"      => "khalifa47@yopmail.com",
                "phone"      => 711144488,
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

        array_map(function($user) {
            $user = User::create([
                ...$user,
                "password"          => Hash::make(12345678),
                "email_verified_at" => now(),
                "created_at"        => now(),
                "updated_at"        => now()
            ]);
            $user->assignRole(Role::SUPER_ADMIN->value);
            $user->wallet()->create();
        }, $users);

        /**
         * .....................    FACTORIES
         */
        User::factory(5)->create();
    }
}
