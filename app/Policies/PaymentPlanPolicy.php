<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\PaymentPlan;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PaymentPlanPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param \App\Models\User $user
     * @return void|bool
     */
    public function before(User $user)
    {
        if($user->hasRole(Role::ADMIN)) return true;
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User        $user
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, PaymentPlan $paymentPlan): Response|bool
    {
        return in_array($user->id, [$paymentPlan->lease->unit->user_id, $paymentPlan->lease->user_id]);
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
     * @param \App\Models\User        $user
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, PaymentPlan $paymentPlan): Response|bool
    {
        return $user->id === $paymentPlan->lease->unit->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User        $user
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return bool
     */
    public function delete(User $user, PaymentPlan $paymentPlan): bool
    {
        return $user->id === $paymentPlan->lease->unit->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User        $user
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, PaymentPlan $paymentPlan)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User        $user
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, PaymentPlan $paymentPlan)
    {
        //
    }
}
