<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAmenitiable
 */
class Amenitiable extends Model
{
    use HasFactory;

    protected $fillable = [
        "amenity_id",
        "amenitiable_type",
        "amenitiable_id",
        "description",
    ];
}
