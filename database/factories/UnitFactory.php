<?php

namespace Database\Factories;

use App\Enums\Purpose;
use App\Enums\Status;
use App\Enums\UnitType;
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
            "price"         => fn (array $attributes) => match ($attributes["purpose"]) {
                Purpose::SALE->value => $this->faker->numberBetween(10000000, 100000000),
                Purpose::RENT->value => $this->faker->numberBetween(10000, 500000)
            },
            "type"          => $this->faker->randomElement(UnitType::cases()),
            "created_at"    => $this->faker->dateTimeBetween('-1 years'),
            "status"        => $this->faker->randomElement([Status::ACTIVE, Status::INACTIVE]),
        ];
    }
}
