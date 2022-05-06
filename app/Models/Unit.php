<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperUnit
 */
class Unit extends Model
{
    use HasFactory;

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function property(): MorphTo
    {
        return $this->morphTo();
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lease(): HasOne
    {
        return $this->hasOne(Lease::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function policies(): MorphMany
    {
        return $this->morphMany(Policy::class, 'property');
    }

    public function amenities(): MorphMany
    {
        return $this->morphMany(Amenity::class, 'property');
    }
}
