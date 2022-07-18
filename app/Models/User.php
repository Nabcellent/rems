<?php

namespace App\Models;

use App\Enums\Frequency;
use App\Enums\Status;
use App\Enums\Role;
use App\Notifications\ApproveAccount;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Notification;
use JetBrains\PhpStorm\ArrayShape;
use Laravel\Sanctum\HasApiTokens;
use Nabcellent\Laraconfig\HasConfig;
use Spatie\Permission\Contracts\Role as RoleModel;
use Spatie\Permission\Traits\HasRoles;
use function array_column;

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
        "username",
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
    protected $appends = ["full_name", "user_roles", "user_roles_str", "initials", "wallet_balance"];

    /**
     * Get the user's full name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function fullName(): Attribute
    {
        return Attribute::get(function($value, $attributes) {
            $fullName = ($attributes["first_name"] ?? "") . ($attributes["last_name"] ?? "");

            if(!$fullName) $fullName = $attributes["username"] ?? "";

            return str($fullName)->headline();
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
     * Get the user's roles.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function walletBalance(): Attribute
    {
        return Attribute::get(fn() => $this->wallet?->balance ?? 0);
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


    /**
     * Scope the model query to certain roles only.
     *
     * @param \Illuminate\Database\Eloquent\Builder                                             $query
     * @param string|int|array|\Spatie\Permission\Contracts\Role|\Illuminate\Support\Collection $roles
     * @param string                                                                            $guard
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRole(Builder $query, $roles, $guard = null): Builder
    {
        if($roles instanceof Role) $roles = $roles->value;

        if($roles instanceof Collection) $roles = $roles->all();

        $roles = array_map(function($role) use ($guard) {
            if($role instanceof Role) $role = $role->value;

            if($role instanceof RoleModel) return $role;

            $method = is_numeric($role) ? 'findById' : 'findByName';

            return $this->getRoleClass()->{$method}($role, $guard ? : $this->getDefaultGuardName());
        }, Arr::wrap($roles));

        return $query->whereHas('roles', function(Builder $subQuery) use ($roles) {
            $roleClass = $this->getRoleClass();
            $key = (new $roleClass())->getKeyName();
            $subQuery->whereIn(config('permission.table_names.roles') . ".$key", array_column($roles, $key));
        });
    }

    public function hasRole($roles, string $guard = null): bool
    {
        if($roles instanceof Role) $roles = $roles->value;

        if(is_string($roles) && false !== strpos($roles, '|')) {
            $roles = $this->convertPipeToArray($roles);
        }

        if(is_string($roles)) {
            return $guard ? $this->roles->where('guard_name', $guard)->contains('name', $roles)
                : $this->roles->contains('name', $roles);
        }

        if(is_int($roles)) {
            $roleClass = $this->getRoleClass();
            $key = (new $roleClass())->getKeyName();

            return $guard ? $this->roles->where('guard_name', $guard)->contains($key, $roles)
                : $this->roles->contains($key, $roles);
        }

        if($roles instanceof RoleModel) {
            return $this->roles->contains($roles->getKeyName(), $roles->getKey());
        }

        if(is_array($roles)) {
            foreach($roles as $role) {
                if($role instanceof Role) $role = $role->value;

                if($this->hasRole($role, $guard)) {
                    return true;
                }
            }

            return false;
        }

        return $roles->intersect($guard ? $this->roles->where('guard_name', $guard) : $this->roles)->isNotEmpty();
    }

    /**
     * Determine if the model has all of the given role(s).
     *
     * @param string|array|\Spatie\Permission\Contracts\Role|\Illuminate\Support\Collection|\App\Enums\Role $roles
     * @param string|null                                                                                   $guard
     * @return bool
     */
    public function hasAllRoles($roles, string $guard = null): bool
    {
        if($roles instanceof Role) $roles = $roles->value;

        if(is_array($roles)) $roles = array_map(fn(Role $role) => $role->value, $roles);

        if(is_string($roles) && false !== strpos($roles, '|')) {
            $roles = $this->convertPipeToArray($roles);
        }

        if(is_string($roles)) {
            return $guard ? $this->roles->where('guard_name', $guard)->contains('name', $roles)
                : $this->roles->contains('name', $roles);
        }

        if($roles instanceof RoleModel) {
            return $this->roles->contains($roles->getKeyName(), $roles->getKey());
        }

        $roles = collect()->make($roles)->map(function($role) {
            return $role instanceof RoleModel ? $role->name : $role;
        });

        return $roles->intersect($guard ? $this->roles->where('guard_name', $guard)->pluck('name')
                : $this->getRoleNames()) == $roles;
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
            Role::ADMIN->value,
            Role::SUPER_ADMIN->value
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
        return $this->hasRole([Role::ADMIN->value, Role::SUPER_ADMIN->value]);
    }

    #[ArrayShape([
        "total_invoiced" => "mixed|null",
        "total_paid"     => "mixed",
        "arrears"        => "mixed"
    ])] public function rentFigures(): array
    {
        $rentFigures = $this->leases->pluck("rent_figures");
        $totalInvoice = $rentFigures->sum("total_invoiced");
        $totalPaid = $rentFigures->sum("total_paid");

        return [
            "total_invoiced" => $totalInvoice,
            "total_paid"     => $totalPaid,
            "arrears"        => $totalInvoice - $totalPaid
        ];
    }
}
