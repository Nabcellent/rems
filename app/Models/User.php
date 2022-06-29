<?php

namespace App\Models;

use App\Events\UserCreated;
use App\Notifications\ApproveAccount;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Notification;
use Laravel\Sanctum\HasApiTokens;
use Nabcellent\Laraconfig\HasConfig;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, HasConfig;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "gender",
        "image",
        "password",
        "status"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        "remember_token",
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        "email_verified_at" => "datetime",
        "approved_at"       => "datetime",
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["full_name", "user_roles", "user_roles_str", "initials"];

    /**
     * Get the user's full name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function fullName(): Attribute
    {
        return Attribute::get(function($value, $attributes) {
            $firstName = $attributes["first_name"] ?? "";
            $lastName = $attributes["last_name"] ?? "";
            return str($firstName . $lastName)->headline();
        });
    }

    /**
     * Get the user's full name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function initials(): Attribute
    {
        return Attribute::get(function($value, $attributes) {
            $names = [
                $attributes["first_name"] ?? "",
                $attributes["last_name"] ?? ""
            ];

            $initials = "";
            foreach($names as $name) $initials .= strtoupper($name[0] ?? "");

            return $initials;
        });
    }

    /**
     * Get the user's roles.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function userRoles(): Attribute
    {
        return Attribute::make(get: fn() => $this->getRoleNames());
    }

    /**
     * Get the user's roles.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function userRolesStr(): Attribute
    {
        return Attribute::get(fn() => stringifyArr($this->getRoleNames()));
    }


    /**
     * .....................    _____________________RELATIONSHIPS
     */
    public function estates(): HasMany
    {
        return $this->hasMany(Estate::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }

    public function leases(): HasMany
    {
        return $this->hasMany(Lease::class);
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

    public function notices(): BelongsToMany
    {
        return $this->belongsToMany(Notice::class, "notice_recipients");
    }


    public function hasApprovedAccount(): bool
    {
        return !is_null($this->approved_at);
    }

    /**
     * Mark the given user's email as verified.
     *
     * @return bool
     */
    public function markAccountAsApproved(): bool
    {
        return $this->forceFill(["approved_at" => $this->freshTimestamp()])->save();
    }

    public function sendAccountApprovalNotification()
    {
        Notification::send(User::role([
            \App\Enums\Role::ADMIN->value,
            \App\Enums\Role::SUPER_ADMIN->value
        ])->get(), new ApproveAccount($this));
    }


    /**
     * Check if the user should initialize settings automatically after creation.
     *
     * @return bool
     */
    protected function shouldInitializeConfig(): bool
    {
        // Don't initialize the settings if the user is not verified from the start.
        // We will initialize them only once the email is properly verified.
        return null !== $this->email_verified_at;
    }

    /**
     * .....................    _____________________HELPERS
     */
    public function isAdmin(): bool
    {
        return $this->hasRole([\App\Enums\Role::ADMIN->value, \App\Enums\Role::SUPER_ADMIN->value]);
    }
}
