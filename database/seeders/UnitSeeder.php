<?php

namespace Database\Seeders;

use App\Models\Estate;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
//        Schema::disableForeignKeyConstraints();
//        Unit::truncate();
//        Lease::truncate();
//        Schema::enableForeignKeyConstraints();

        /**
         * .....................    FACTORIES
         */
        Unit::factory(30)->for(Estate::factory(), "unitable")->hasRooms(2)->hasLeases(1)->hasAmenities(3)->create();
        Unit::factory(20)->for(Property::factory(), "unitable")->hasRooms(3)->hasAmenities(2)->create();
        Unit::factory(10)->for(Property::factory(), "unitable")->hasRooms(5)->hasAmenities(2)->create();
        Unit::factory(5)->for(Property::factory(), "unitable")->hasRooms(7)->hasAmenities(2)->create();
    }
}
