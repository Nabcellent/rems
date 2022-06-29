<?php

namespace App\Listeners;

use App\Events\UserCreated;
use Illuminate\Auth\Events\Registered;

class ProcessCreatedUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct() { }

    /**
     * Handle the event.
     *
     * @param \App\Events\UserCreated $event
     * @return void
     */
    public function handle(UserCreated $event): void
    {
        event(new Registered($event->user));

        $event->user->wallet()->create();
    }
}
