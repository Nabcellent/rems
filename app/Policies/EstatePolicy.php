<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Estate;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class EstatePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param \App\Models\User $user
     * @param string           $ability
     * @return void|bool
     */
    public function before(User $user, string $ability)
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
        return $user->hasRole([Role::PROPERTY_MANAGER->value]);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Estate $estate)
    {
        return $estate->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user): Response|bool
    {
        return $user->hasRole(Role::PROPERTY_MANAGER->value);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Estate $estate): Response|bool
    {
        return $estate->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Estate $estate)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Estate $estate)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Estate $estate)
    {
        //
    }
}
