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
        Unit::factory(5)->hasLease()->create();
        Unit::factory()->hasRooms(3)->create();

        Room::factory(3)->forUnit()->create(); // Same as the above
    }
}
