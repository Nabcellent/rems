<?php

namespace Database\Seeders;

use App\Models\ServiceProvider;
use Illuminate\Database\Seeder;

class ServiceProviderSeeder extends Seeder
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
        ServiceProvider::factory(3)->create();
    }
}
