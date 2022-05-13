<?php

namespace App\Models;

use App\Enums\Status;
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
        "status"
    ];

    protected $casts = [
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
}
