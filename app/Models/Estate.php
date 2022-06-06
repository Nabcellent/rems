<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperEstate
 */
class Estate extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "location"
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
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

    /**
     * The services that belong to the user(provider).
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'estate_services')->withPivot('id', 'description');
    }
}
