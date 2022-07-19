<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Amenity::factory(10)->create();

        Amenity::insert([
            ["title" => "Swimming Pool"],
            ["title" => "Gym"],
            ["title" => "Playing Ground"],
            ["title" => "Garage"],
        ]);
    }
}
