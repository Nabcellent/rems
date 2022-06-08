<?php

use App\Enums\Status;
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
        Schema::create('paypal_transactions', function(Blueprint $table) {
            $table->id();
            $table->string("order_id")->unique();
            $table->string("payer_id")->nullable();
            $table->string("payer_email")->nullable();
            $table->double("amount", 10)->nullable();
            $table->string("currency", 5)->nullable();
            $table->string("status", 20)->default(Status::PENDING->value);
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
        Schema::dropIfExists('paypal_transactions');
    }
};
