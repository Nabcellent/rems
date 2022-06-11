<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperProperty
 */
class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        "estate_id",
        "user_id",
        "name",
        "type",
        "image",
        "status",
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function estate(): BelongsTo
    {
        return $this->belongsTo(Estate::class);
    }

    /** Property Manager
     * */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function units(): MorphMany
    {
        return $this->morphMany(Unit::class, 'unitable');
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function policies(): MorphMany
    {
        return $this->morphMany(Policy::class, 'policeable');
    }

    public function amenities(): MorphMany
    {
        return $this->morphMany(Amenity::class, 'property');
    }
}
