<?php

namespace Database\Factories;

use App\Enums\Description;
use Illuminate\Database\Eloquent\Factories\Factory;
use Propaganistas\LaravelPhone\PhoneNumber;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MpesaStkCallback>
 */
class MpesaStkRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $merchantRequestId = $this->faker->randomNumber(5) . "-" . now()->timestamp . mt_rand(0, 9);
        $checkoutRequestId = "ws_CO_" . now()->timestamp . $this->faker->randomNumber(9);
        $phone = PhoneNumber::make(7 . $this->faker->unique()->numerify('########'), 'KE');

        return [
            "merchant_request_id" => $merchantRequestId,
            "checkout_request_id" => $checkoutRequestId,
            "amount"              => $this->faker->numberBetween(1000, 100000),
            "phone"               => ltrim($phone, '+'),
            "reference"           => $this->faker->randomElement(["REMS Wallet", "REMS Rent"]),
            "description"         => $this->faker->randomElement(Description::cases()),
        ];
    }
}
