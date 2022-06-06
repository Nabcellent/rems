<?php

namespace Database\Factories;

use App\Models\Estate;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Policy>
 */
class PolicyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $payable = $this->faker->randomElement([
            Estate::factory(),
            Property::factory(),
            Unit::factory(),
        ]);

        return [
            "policeable_id"   => $payable->create()->id,
            "policeable_type" => $payable->modelName(),
            "description"     => $this->faker->realText(40)
        ];
    }
}
