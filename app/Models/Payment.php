<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperPayment
 */
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        "transaction_id",
        "payable_type",
        "payable_id",
        "amount",
        "method",
        "status"
    ];

    protected $casts = [
        "status" => Status::class,
        "method" => PaymentMethod::class
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function payable(): MorphTo
    {
        return $this->morphTo();
    }
}
