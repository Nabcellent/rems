<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperAmenity
 */
class Amenity extends Model
{
    use HasFactory;

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function payable(): MorphTo
    {
        return $this->morphTo();
    }
}
