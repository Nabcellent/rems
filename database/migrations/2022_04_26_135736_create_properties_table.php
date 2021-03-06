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
        Schema::create('properties', function(Blueprint $table) {
            $table->id();
            $table->foreignId('estate_id')->constrained()->cascadeOnUpdate()->cascadeOnUpdate();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->cascadeOnUpdate()
                ->comment('Property Manager');
            $table->string('name', 100)->nullable();
            $table->string('type', 50);
            $table->string("image", 30)->nullable();
            $table->string('status', 20)->default(Status::ACTIVE->value);
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
        Schema::dropIfExists('properties');
    }
};
