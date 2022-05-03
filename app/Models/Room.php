<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperRoom
 */
class Room extends Model
{
    use HasFactory;

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }
}
