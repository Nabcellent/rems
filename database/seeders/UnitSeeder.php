<?php

namespace Database\Seeders;

use App\Models\Room;
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
        /**
         * .....................    FACTORIES
         */
        Unit::factory(3)->hasLeases(1)->create();
        Unit::factory()->hasRooms(2)->hasPolicies(1)->create();

        Room::factory(2)->forUnit()->create(); // Same as the above
    }
}
