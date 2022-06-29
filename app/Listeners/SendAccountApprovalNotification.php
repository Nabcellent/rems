<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;

class SendAccountApprovalNotification
{
    /**
     * Handle the event.
     *
     * @param \Illuminate\Auth\Events\Registered $event
     * @return void
     */
    public function handle(Registered $event): void
    {
        if(!$event->user->hasApprovedAccount()) $event->user->sendAccountApprovalNotification();
    }
}
