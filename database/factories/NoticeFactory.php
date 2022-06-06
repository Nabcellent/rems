<?php

namespace Database\Factories;

use App\Enums\NoticeType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notice>
 */
class NoticeFactory extends Factory
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
            "type"        => $this->faker->randomElement(NoticeType::cases()),
            "description" => $this->faker->text,
            "start_at"  => fn(array $attributes) => match ($attributes["type"]) {
                NoticeType::VACATION => null,
                default => $this->faker->dateTimeBetween('now', '+1 week'),
            },
            "end_at"    => fn(array $attributes) => $this->faker->dateTimeBetween($attributes["start_at"], '+3 months'),
            "created_at"  => $this->faker->dateTimeBetween('-1 year')
        ];
    }
}
