<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentPlan>
 */
class PaymentPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "rent_amount" => $this->faker->numberBetween(20000, 100000),
            "deposit"     => $this->faker->numberBetween(0, 50000),
            "due_day"     => $this->faker->numberBetween(1, 31),
        ];
    }
}
