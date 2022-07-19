<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
//        Schema::disableForeignKeyConstraints();
//        Property::truncate();
//        Schema::enableForeignKeyConstraints();

        /**
         * .....................    FACTORIES
         */
//        Property::factory(3)->create();
        Property::factory(20)->hasUnits(10)->create();
    }
}
