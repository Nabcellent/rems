<?php

namespace Database\Seeders;

use App\Models\Lease;
use Illuminate\Database\Seeder;

class LeaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Lease::factory(5)->create();
        Lease::factory(3)->hasPaymentPlans(mt_rand(1, 3))->create();
    }
}
