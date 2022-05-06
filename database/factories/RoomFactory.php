<?php

namespace Database\Factories;

use App\Enums\RoomType;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "unit_id" => Unit::factory(),
            "type" => $this->faker->randomElement(RoomType::cases()),
        ];
    }
}
