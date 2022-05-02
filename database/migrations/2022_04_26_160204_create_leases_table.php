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
        Schema::create('leases', function(Blueprint $table) {
            $table->id();
            $table->foreignId("unit_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId("user_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete()->comment(
                "Tenant"
            )->nullable();
            $table->integer("deposit")->default(0);
            $table->integer("rent_amount");
            $table->timestamp("start_date");
            $table->timestamp("end_date");
            $table->string("status")->default(Status::INACTIVE->value);
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
        Schema::dropIfExists('leases');
    }
};
