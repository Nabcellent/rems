<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        /**
         * .....................    FACTORIES
         */
        Schema::disableForeignKeyConstraints();
        DB::table("payments")->truncate();
        Schema::enableForeignKeyConstraints();

        Payment::factory(5)->forPayable()->create();
    }
}
