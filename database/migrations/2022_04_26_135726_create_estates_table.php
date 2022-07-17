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
        Schema::create('estates', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId("manager_id")->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string("name", 100);
            $table->string("address");
            $table->string("description")->nullable();
            $table->string("image", 30)->nullable();
            $table->double("latitude", 180, 7);
            $table->double("longitude", 180, 7);
            $table->integer("service_charge")->default(0);
            $table->string("status", 20)->default(Status::INACTIVE->value);
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
        Schema::dropIfExists('estates');
    }
};
