<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPolicy
 */
class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        "description"
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function policeable(): BelongsTo
    {
        return $this->morphTo();
    }
}
