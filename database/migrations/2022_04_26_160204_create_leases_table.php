<?php

use App\Enums\RentFrequency;
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
            $table->foreignId("user_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete()->comment("Tenant")
                ->nullable();
            $table->string("status")->default(Status::INACTIVE->value);
            $table->timestamp("expires_at");
            $table->timestamps();

            $table->unique(["unit_id", "user_id"]);
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
