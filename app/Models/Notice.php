<?php

namespace App\Models;

use App\Enums\NoticeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperNotice
 */
class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "type",
        "description",
        "start_at",
        "end_at",
    ];

    protected $casts = [
        "type"     => NoticeType::class,
        "start_at" => "datetime",
        "end_at"   => "datetime",
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
