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
            //            RoleSeeder::class,
            //            UserSeeder::class,
            //            EstateSeeder::class,
            //            PropertySeeder::class,
            //            UnitSeeder::class,
            //            LeaseSeeder::class,
            //            ServiceSeeder::class,
            AmenitySeeder::class,
            //            ServiceProviderSeeder::class,
            //            TransactionSeeder::class,
            //            PaymentSeeder::class,
            //            TicketSeeder::class,
            //            NoticeSeeder::class,
        ]);
    }
}
