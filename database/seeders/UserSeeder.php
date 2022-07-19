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
                "phone"      => 254110039317,
                "gender"     => "male",
                "role"       => Role::SUPER_ADMIN
            ], [
                "first_name" => "Khalifa",
                "last_name"  => "Fumo",
                "email"      => "khalifa47@yopmail.com",
                "phone"      => 254711144488,
                "gender"     => "male",
                "role"       => Role::SUPER_ADMIN
            ], [
                "first_name" => "Rems",
                "last_name"  => "Super",
                "email"      => "super.admin@yopmail.com",
                "role"       => Role::SUPER_ADMIN
            ], [
                "first_name" => "Rems",
                "last_name"  => "Admin",
                "email"      => "admin.rems@yopmail.com",
                "role"       => Role::ADMIN
            ], [
                "first_name" => "Property",
                "last_name"  => "Manager",
                "email"      => "manager.rems@yopmail.com",
                "role"       => Role::PROPERTY_MANAGER
            ], [
                "first_name" => "Rems",
                "last_name"  => "Owner",
                "email"      => "owner.rems@yopmail.com",
                "role"       => Role::OWNER
            ], [
                "first_name" => "Rems",
                "last_name"  => "Tenant",
                "email"      => "tenant.rems@yopmail.com",
                "role"       => Role::TENANT
            ], [
                "first_name" => "Service",
                "last_name"  => "Provider",
                "email"      => "provider.rems@yopmail.com",
                "role"       => Role::SERVICE_PROVIDER
            ],
        ];

        array_map(function($user) {
            $role = Arr::pull($user, "role");

            User::create([
                ...$user,
                "password"          => Hash::make(12345678),
                "email_verified_at" => now(),
                "approved_at"       => now(),
                "created_at"        => now(),
                "updated_at"        => now()
            ])->assignRole($role->value)->wallet()->create();
        }, $users);

        /**
         * .....................    FACTORIES
         */
        User::factory(50)->create();
    }
}
