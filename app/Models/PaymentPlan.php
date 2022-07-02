<?php

namespace App\Models;

use App\Enums\RentFrequency;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

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
        "frequency" => RentFrequency::class
    ];

    public function lease(): BelongsTo
    {
        return $this->belongsTo(Lease::class);
    }
}
