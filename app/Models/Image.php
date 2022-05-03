<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperImage
 */
class Image extends Model
{
    use HasFactory;

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
