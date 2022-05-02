<?php

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
    public function up()
    {
        Schema::create('properties', function(Blueprint $table) {
            $table->id();
            $table->foreignId('estate_id')->constrained()->cascadeOnUpdate()->cascadeOnUpdate();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->cascadeOnUpdate()->comment(
                    'Property manager'
                );
            $table->string('type', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
