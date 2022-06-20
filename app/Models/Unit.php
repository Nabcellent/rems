<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperUnit
 */
class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "unitable_id",
        "unitable_type",
        "house_number",
        "purpose",
        "type",
        "description",
        "image",
        "status",
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["unitable_name", "estate"];

    public function unitableName(): Attribute
    {
        return Attribute::get(fn() => match ($this->unitable_type) {
            Estate::class => "estate",
            Property::class => "property",
            default => null
        });
    }

    public function estate(): Attribute
    {
        return Attribute::get(fn() => match ($this->unitable_type) {
            Estate::class => $this->unitable,
            Property::class => $this->unitable->estate,
            default => null
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

    public function leases(): HasMany
    {
        return $this->hasMany(Lease::class);
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
        return $this->morphMany(Policy::class, 'policeable');
    }

    public function amenities(): MorphMany
    {
        return $this->morphMany(Amenity::class, 'property');
    }

    /**
     * .....................    _____________________HELPERS
     */
    public function scopeOccupied(Builder $qry): Builder
    {
        return $qry->whereHas("leases", fn(Builder $qry) => $qry->whereStatus(Status::ACTIVE));
    }
}
