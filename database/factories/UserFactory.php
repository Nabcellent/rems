<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Enums\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(["male", "female", null]);

        return [
            'first_name' => $this->faker->firstName($gender),
            'last_name' => $this->faker->lastName,
            'gender' => $gender,
            'phone' => 7 . $this->faker->unique()->numerify('########'),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            "status" => $this->faker->randomElement([Status::ACTIVE, Status::INACTIVE]),
            'password' => Hash::make(12345678),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(function(array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function(User $user) {
            $user->assignRole(Arr::random([
                Role::ADMIN,
                Role::PROPERTY_MANAGER,
                Role::OWNER,
                Role::SERVICE_PROVIDER,
                Role::TENANT
            ])->value);
        });
    }
}
