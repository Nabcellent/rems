<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        /**
         * .....................    FACTORIES
         */
        Service::factory(3)->create();
        Service::factory(5)->hasProviders(2)->create();
    }
}
