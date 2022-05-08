<?php

namespace Database\Factories;

use App\Enums\Description;
use App\Enums\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id"        => User::factory(),
            "destination_id" => User::factory(),
            "amount"         => $this->faker->numberBetween(100, 100000),
            "description"    => $this->faker->randomElement(Description::cases()),
            "status"         => $this->faker->randomElement([Status::COMPLETED, Status::PENDING, Status::FAILED])
        ];
    }
}
