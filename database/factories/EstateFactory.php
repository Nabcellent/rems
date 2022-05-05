<?php

namespace Database\Factories;

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
    #[ArrayShape([
        "user_id"  => "mixed",
        "name"     => "string",
        "location" => "string"
    ])] public function definition(): array
    {
        return [
            "user_id"  => User::factory(),
            "name"     => $this->faker->streetName(),
            "location" => $this->faker->streetAddress(),
        ];
    }
}
