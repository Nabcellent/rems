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
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->hasRole([Role::OWNER->value, Role::TENANT->value]);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Lease $lease)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user): Response|bool
    {
        return $user->hasRole([Role::OWNER->value]);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User  $user
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Lease $lease)
    {
        //
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
        //
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
