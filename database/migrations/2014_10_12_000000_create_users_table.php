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
        Schema::create('users', function(Blueprint $table) {
            $table->id();
            $table->string('first_name', 20);
            $table->string('last_name', 20);
            $table->bigInteger('phone')->unique()->nullable();
            $table->string('gender', 6)->nullable();
            $table->string('image', 20)->nullable();
            $table->string('email', 100)->unique();
            $table->string("status", 20)->default(Status::ACTIVE->value);
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp("approved_at")->nullable();
            $table->string('password')->invisible();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
