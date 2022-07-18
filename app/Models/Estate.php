<?php

namespace App\Models;

use App\Enums\Status;
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
        "county",
        "address",
        "manager_id",
        "image",
        "latitude",
        "longitude",
        "service_charge",
        "status",
    ];

    protected $attributes = [
        "status"         => Status::INACTIVE,
        "service_charge" => 0
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, "manager_id");
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

    public function amenities(): BelongsToMany
    {
        return $this->morphToMany(Amenity::class, "amenitiable")->withPivot("id", "description");
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, "estate_services")->withPivot('id', 'description');
    }
}
