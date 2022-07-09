<?php

use App\Enums\Frequency;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('payment_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId("lease_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->integer("deposit")->default(0);
            $table->integer("rent_amount");
            $table->string("frequency", 20)->default(Frequency::MONTHLY->value);
            $table->tinyInteger("due_day");
            $table->boolean("is_default")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_plans');
    }
};
