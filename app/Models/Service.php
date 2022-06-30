<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperService
 */
class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "icon",
        "description"
    ];

    /**
     * .....................    _____________________RELATIONSHIPS
     */
    /**
     * The users(providers) that belong to the service.
     */
    public function providers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "service_providers");
    }

    /**
     * The users(providers) that belong to the service.
     */
    public function estates(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "estate_services");
    }
}
