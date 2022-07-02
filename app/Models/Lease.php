<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperLease
 */
class Lease extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "unit_id",
        "expires_at",
        "status",
    ];

    protected $casts = [
        "status"     => Status::class,
        "expires_at" => "datetime"
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

    public function paymentPlans(): HasMany
    {
        return $this->hasMany(PaymentPlan::class);
    }

    /**
     * .....................    _____________________HELPERS
     */
    public function scopeActive(Builder $qry)
    {
        return $qry->whereStatus(Status::ACTIVE);
    }
}
