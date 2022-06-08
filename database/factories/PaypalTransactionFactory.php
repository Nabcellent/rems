<?php

namespace Database\Factories;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaypalTransaction>
 */
class PaypalTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "order_id"    => $this->faker->uuid(),
            "currency"    => $this->faker->currencyCode(),
            "payer_email" => $this->faker->email(),
            "amount"      => $this->faker->numberBetween(100, 100000),
            "status"      => $this->faker->randomElement([Status::COMPLETED, Status::PENDING, Status::FAILED]),
        ];
    }
}
