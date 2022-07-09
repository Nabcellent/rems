<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Lease;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LeasePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param \App\Models\User $user
     * @param string           $ability
     * @return void|bool
     */
    public function before(User $user)
    {
        if($user->hasRole(Role::ADMIN->value)) return true;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user): Response|bool
    {
        return $user->units->isNotEmpty() || $user->leases->isNotEmpty();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Lease $lease): Response|bool
    {
        return $user->id === $lease->unit->user_id || $user->id === $lease->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user): Response|bool
    {
        return $user->units->isNotEmpty();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Lease $lease): Response|bool
    {
        return $user->id === $lease->unit->user_id;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User       $user
     * @param \App\Models\Lease|null $lease
     * @return bool
     */
    public function updateStatus(User $user, Lease $lease = null): bool
    {
        return $user->id === optional($lease?->unit)->user_id || $user->hasAnyRole(Role::PROPERTY_MANAGER->value, Role::OWNER->value);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Lease $lease)
    {
        return $user->id === $lease->unit->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Lease $lease)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Lease $lease)
    {
        //
    }
}
