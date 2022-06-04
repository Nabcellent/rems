<?php

namespace Database\Seeders;

use App\Enums\SettingKey;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
//        Schema::disableForeignKeyConstraints();
//        Setting::truncate();
//        Schema::enableForeignKeyConstraints();

        /*Setting::insert([
            [
                "key"   => SettingKey::DEFAULT_USER_PASSWORD,
                "value" => "12345678"
            ]
        ]);*/
    }
}
