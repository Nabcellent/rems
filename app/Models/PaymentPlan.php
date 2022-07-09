<?php

namespace App\Models;

use App\Enums\Frequency;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperPaymentPlan
 */
class PaymentPlan extends Pivot
{
    protected $table = "payment_plans";

    protected $fillable = [
        "lease_id",
        "deposit",
        "rent_amount",
        "due_day",
        "frequency"
    ];

    protected $casts = [
        "frequency"  => Frequency::class,
        "is_default" => "bool"
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["is_default"];

    public function isDefault(): Attribute
    {
        return Attribute::get(function() {
            return $this->is_default ?? $this->frequency === Frequency::MONTHLY ?? $this->lease->paymentPlans->first()->id === $this->id;
        });
    }

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class);
    }
}
