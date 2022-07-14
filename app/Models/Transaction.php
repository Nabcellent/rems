<?php

namespace App\Models;

use App\Enums\Description;
use App\Enums\Status;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @mixin IdeHelperTransaction
 */
class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "destination_id",
        "type",
        "amount",
        "description",
        "status"
    ];

    protected $casts = [
        "type"   => TransactionType::class,
        "status" => Status::class
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(User::class, "destination_id");
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }


    /**
     * Scope a query to only include popular users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRentPayment(Builder $query): Builder
    {
        return $query->whereDescription(Description::RENT_PAYMENT)->orWhere("description", Description::RENT_DEPOSIT);
    }
}
