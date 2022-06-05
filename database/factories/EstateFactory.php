<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estate>
 */
class EstateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id"    => User::factory(),
            "name"       => $this->faker->streetName(),
            "address"    => $this->faker->streetAddress(),
            "latitude"   => $this->faker->latitude(-0.864785, -1.695412),
            "longitude"  => $this->faker->longitude(36.384459, 37.466612),
            "status"     => $this->faker->randomElement([Status::ACTIVE, Status::INACTIVE]),
            "created_at" => $this->faker->dateTimeBetween('-1 years')
        ];
    }
}
