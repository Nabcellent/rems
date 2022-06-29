<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\AccountApproved;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountApprovalController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        return $request->user()->hasApprovedAccount() ? redirect()->intended(RouteServiceProvider::HOME)
            : Inertia::render('auth/ApproveAccount');
    }

    public function approveAccount(User $user): RedirectResponse
    {
        $type = "success";

        if ($user->hasApprovedAccount()) {
            $message = "$user->full_name already has an approved account";
            $type = "info";
        } else {
            if ($user->markAccountAsApproved()) {
                $user->settings()->initialize();
                $user->notify(new AccountApproved);

                $message = "$user->full_name now has an approved account.";
            } else {
                $message = "$user->full_name now has an approved account.";
                $type = "error";
            }
        }

        return redirect()->intended(back()->getTargetUrl())->with("toast", ["message" => $message, "type" => $type]);
    }
}
