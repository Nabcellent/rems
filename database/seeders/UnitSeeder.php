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
        Unit::factory(3)->hasLease()->create();
        Unit::factory()->hasRooms(2)->create();

        Room::factory(2)->forUnit()->create(); // Same as the above
    }
}
