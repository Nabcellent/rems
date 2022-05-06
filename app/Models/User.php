<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Nabcellent\Laraconfig\HasConfig;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, HasConfig;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function estates(): HasMany
    {
        return $this->hasMany(Estate::class);
    }

    public function property(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function unit(): HasMany
    {
        return $this->hasMany(Unit::class);
    }

    public function lease(): HasOne
    {
        return $this->hasOne(Lease::class);
    }

    /**
     * The services that belong to the user(provider).
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_providers');
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function notices(): HasMany
    {
        return $this->hasMany(Notice::class);
    }
}
