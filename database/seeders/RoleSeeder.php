<?php

namespace Database\Seeders;

use App\Enums\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role as RoleModel;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        RoleModel::insert(array_map(fn(Role $role) => ["name" => $role->value, "guard_name" => "web"], Role::cases()));
    }
}
