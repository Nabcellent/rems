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
        "frequency",
        "is_default",
    ];

    protected $casts = [
        "frequency"  => Frequency::class,
        "is_default" => "bool"
    ];

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class);
    }
}
