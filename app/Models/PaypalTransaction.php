<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperPaypalTransaction
 */
class PaypalTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_id",
        "payer_id",
        "payer_email",
        "status",
        "amount",
        "currency",
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }
}
