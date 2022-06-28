<?php

use App\Enums\Status;
use App\Enums\UnitType;
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
        Schema::create('units', function(Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete()->comment(
                'Property Manager or Owner'
            );
            $table->morphs('unitable'); // Property ID or Estate ID
            $table->string('house_number');
            $table->string("purpose")->comment("For Rent or For Sale");
            $table->string("type")->default(UnitType::UNFURNISHED->name)->comment("Furnished or Unfurnished");
            $table->text("description")->nullable();
            $table->integer("price")->nullable();
            $table->string("image", 30)->nullable();
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
        Schema::dropIfExists('units');
    }
};
