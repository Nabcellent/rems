<?php

namespace App\Models;

use App\Enums\Frequency;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPaymentPlan
 */
class PaymentPlan extends Model
{
    use HasFactory;

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
