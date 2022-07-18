<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param \Illuminate\Foundation\Auth\EmailVerificationRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME . '?verified=1');
        }

        if($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(RouteServiceProvider::HOME . '?verified=1');
    }

    public function verifyEmail(User $user): RedirectResponse
    {
        $type = "success";

        if($user->hasVerifiedEmail()) {
            $message = "$user->full_name already has a verified email.";
            $type = "info";
        } else {
            if($user->markEmailAsVerified()) {
                $user->settings()->initialize();

                $message = "$user->full_name now has a verified email.";
            } else {
                $message = "$user->full_name now has a verified email.";
                $type = "error";
            }
        }

        return redirect()->intended(back()->getTargetUrl())->with("toast", ["message" => $message, "type" => $type]);
    }
}
