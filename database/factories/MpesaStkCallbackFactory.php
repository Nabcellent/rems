<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MpesaStkCallback>
 */
class MpesaStkCallbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $merchantRequestId = $this->faker->randomNumber(5) . "-" . now()->timestamp . mt_rand(0, 9);
        $checkoutRequestId = "ws_CO_" . now()->timestamp . $this->faker->randomNumber(7);

        return [
            "merchant_request_id" => $merchantRequestId,
            "checkout_request_id" => $checkoutRequestId,
            "result_code" => $this->faker->randomElement([0, 1032]),
            "result_desc" => fn(array $attributes) => match ($attributes["result_code"]) {
                0 => "The service request is processed successfully.",
                1032 => "Request cancelled by user.",
            }
        ];
    }
}
