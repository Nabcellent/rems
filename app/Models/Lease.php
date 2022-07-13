<?php

namespace App\Models;

use App\Enums\Frequency;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["default_payment_plan"];

    public function defaultPaymentPlan(): Attribute
    {
        return Attribute::get(function() {
            $plan = $this->paymentPlans->firstWhere("is_default", true);
            /*$plan["can"] = [
                "edit"    => user()->can("update", $plan),
                "view"    => user()->can("view", $plan),
                "destroy" => user()->can("delete", $plan)
            ];*/

            return $plan;
        });
    }

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
