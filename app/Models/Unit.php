<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["unitable_model", "estate_name"];

    public function unitableModel(): Attribute
    {
        return Attribute::get(fn() => match ($this->unitable_type) {
            Estate::class => "estate",
            Property::class => "property"
        });
    }

    public function estateName(): Attribute
    {
        return Attribute::get(fn() => match ($this->unitable_type) {
            Estate::class => $this->unitable->name,
            Property::class => $this->unitable->estate->name
        });
    }

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function unitable(): MorphTo
    {
        return $this->morphTo();
    }

    /** Owner
     * */
    public function user(): BelongsTo
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
