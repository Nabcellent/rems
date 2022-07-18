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
    protected $appends = ["default_payment_plan", "rent_figures"];

    public function defaultPaymentPlan(): Attribute
    {
        return Attribute::get(fn() => $this->paymentPlans->firstWhere("is_default", true));
    }

    public function rentFigures(): Attribute
    {
        return Attribute::get(function() {
            $transactions = $this->user->transactions()->whereTransactionableType(Unit::class)
                ->whereTransactionableId($this->unit->id)->whereStatus(Status::COMPLETED)->rentPayment()->get();
            $totalPaid = $transactions->sum("amount");
            $plan = $this->defaultPaymentPlan;
            $dueDay = now()->day($plan->due_day);
            $createdAt = $plan->created_at ?? $this->created_at;

            $noOfExpectedPayments = match ($plan->frequency) {
                Frequency::MONTHLY => $createdAt->diffInMonths($dueDay),
                Frequency::QUARTERLY => $createdAt->diffInQuarters($dueDay),
                Frequency::HALF_YEARLY => $createdAt->diffInYears($dueDay) / 2,
                Frequency::YEARLY => $createdAt->diffInYears($dueDay)
            };

            $totalInvoice = ($noOfExpectedPayments * $plan->rent_amount) + $plan->deposit;

            return ["total_invoiced" => $totalInvoice, "total_paid" => $totalPaid, "arrears" => $totalInvoice - $totalPaid];
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
