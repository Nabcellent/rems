<?php

namespace Database\Factories;

use App\Enums\Purpose;
use App\Models\Estate;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $property = $this->faker->randomElement([Property::factory(), Estate::factory()]);

        return [
            "user_id"       => User::factory(),
            "unitable_id"   => $property->create()->id,
            "unitable_type" => $property->modelName(),
            "house_number"  => $this->faker->buildingNumber(),
            "purpose"       => $this->faker->randomElement(Purpose::cases()),
            "created_at"        => $this->faker->dateTimeBetween('-1 years')
        ];
    }
}
