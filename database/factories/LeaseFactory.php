<?php

namespace Database\Factories;

use App\Enums\Status;
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
            "user_id"     => User::factory(),
            "rent_amount" => $this->faker->numberBetween(20000, 100000),
            "deposit"     => $this->faker->numberBetween(0, 50000),
            "expires_at"  => $this->faker->dateTimeBetween("+2 months", "+1 year"),
            "status"      => $this->faker->randomElement([Status::ACTIVE, Status::INACTIVE]),
            "created_at"  => $this->faker->dateTimeBetween('-1 years')
        ];
    }
}
