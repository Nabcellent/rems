<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
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
            "title"       => $this->faker->realText(50),
            "description" => $this->faker->realText,
            "status"      => $this->faker->randomElement([Status::PENDING, Status::RESOLVED]),
            "created_at"  => $this->faker->dateTimeBetween('-1 years')
        ];
    }
}
