<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendAccountApprovalNotification implements ShouldQueue
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
