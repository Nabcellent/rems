<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperLease
 */
class Lease extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "unit_id",
        "rent_amount",
        "expires_at",
        "status",
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /** Tenant
     * */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * .....................    _____________________HELPERS
     */
    public function scopeActive(Builder $qry)
    {
        return $qry->whereStatus(Status::ACTIVE);
    }
}
