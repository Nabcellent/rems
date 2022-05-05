<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lease>
 */
class LeaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "rent_amount" => $this->faker->numberBetween(10000, 100000),
            "start_date" => $this->faker->dateTimeBetween("+5 days", "+1 month"),
            "end_date" => $this->faker->dateTimeBetween("+2 months", "+1 year")
        ];
    }
}
