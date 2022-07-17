<?php

namespace Database\Seeders;

use App\Models\Estate;
use App\Models\Lease;
use App\Models\Property;
use App\Models\Room;
use App\Models\Unit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

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
        Unit::factory(3)->for(Estate::factory(), "unitable")->hasLeases(1)->hasAmenities(3)->create();
        Unit::factory(2)->for(Property::factory(), "unitable")->hasRooms(3)->hasPolicies(1)->hasAmenities(2)->create();

        Room::factory(2)->forUnit()->create(); // Same as the above
    }
}
