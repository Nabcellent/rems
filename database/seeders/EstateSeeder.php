<?php

namespace Database\Seeders;

use App\Models\Estate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class EstateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
//        Schema::disableForeignKeyConstraints();
//        Estate::truncate();
//        Schema::enableForeignKeyConstraints();

        /**
         * .....................    FACTORIES
         */
        Estate::factory(30)->hasProperties(3)->create();
        Estate::factory(22)->hasUnits(6)->hasPolicies(2)->create();
    }
}
