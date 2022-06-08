<?php

namespace Database\Factories;

use App\Enums\PaymentMethod;
use App\Enums\Status;
use App\Models\MpesaStkCallback;
use App\Models\PaypalTransaction;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $payable = $this->faker->randomElement([
            Wallet::factory(),
            PaypalTransaction::factory(),
            //            MpesaStkCallback::factory()
        ]);

        return [
            "transaction_id" => Transaction::factory(),
            "payable_id"     => $payable->create()->id,
            "payable_type"   => $payable->modelName(),
            "amount"         => $this->faker->numberBetween(1000, 100000),
            "method"         => fn(array $attributes) => match ($attributes["payable_type"]) {
                PaypalTransaction::class => PaymentMethod::PAYPAL,
                Wallet::class => PaymentMethod::WALLET,
                MpesaStkCallback::class => PaymentMethod::MPESA,
                default => PaymentMethod::CASH
            },
            "status"         => $this->faker->randomElement([Status::COMPLETED, Status::PENDING, Status::FAILED])
        ];
    }
}
