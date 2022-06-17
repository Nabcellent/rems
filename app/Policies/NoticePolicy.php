<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Notice;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class NoticePolicy
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
        return $user->leases()->active()->exists();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Notice $notice)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Notice $notice)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Notice $notice)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Notice $notice)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User   $user
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Notice $notice)
    {
        //
    }
}
