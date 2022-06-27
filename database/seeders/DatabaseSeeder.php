<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

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
//            SettingSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
//            EstateSeeder::class,
//            PropertySeeder::class,
//            UnitSeeder::class,
//            ServiceSeeder::class,
//            ServiceProviderSeeder::class,
//            TransactionSeeder::class,
//            PaymentSeeder::class,
//            TicketSeeder::class,
//            NoticeSeeder::class,
        ]);
    }
}
