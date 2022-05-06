<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wallet>
 */
class WalletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape(["user_id" => "mixed", "balance" => "int"])] public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "balance" => $this->faker->numberBetween(int2: 70000)
        ];
    }
}
