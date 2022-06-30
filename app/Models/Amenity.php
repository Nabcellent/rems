<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @mixin IdeHelperAmenity
 */
class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
    ];

    /**
     * Get all the estates that are assigned this amenity.
     */
    public function estates(): MorphToMany
    {
        return $this->morphedByMany(Estate::class, "amenitiable");
    }

    /**
     * Get all the units that are assigned this amenity.
     */
    public function units(): MorphToMany
    {
        return $this->morphedByMany(Unit::class, "amenitiable");
    }
}
