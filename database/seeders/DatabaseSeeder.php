<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\Estate;
use App\Models\Lease;
use App\Models\Property;
use App\Models\Service;
use App\Models\ServiceProvider;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            //  RoleSeeder::class,
            //  UserSeeder::class
        ]);

//        User::factory(5)->create()->each(fn(User $user) => $user->assignRole(Arr::random(Role::cases())->value));
//        Estate::factory(5)->hasProperties(3)->create();
//        Estate::factory(5)->hasUnits(2)->create();
//        Property::factory(5)->create();
//        Property::factory(5)->hasUnits(4)->create();
//        Unit::factory(5)->hasLease()->create();
//        Service::factory(7)->create();
        ServiceProvider::factory(3)->create();
    }
}
