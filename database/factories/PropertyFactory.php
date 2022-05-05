<?php

namespace Database\Factories;

use App\Enums\PropertyType;
use App\Models\Estate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "estate_id" => Estate::factory(),
            "user_id"   => User::factory(),
            "type"      => $this->faker->randomElement(PropertyType::cases())
        ];
    }
}
