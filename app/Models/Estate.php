<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Estate extends Model
{
    use HasFactory;

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function estate(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function units(): MorphMany
    {
        return $this->morphMany(Unit::class, 'property');
    }
}
