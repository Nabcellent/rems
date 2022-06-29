<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Lang;

class ApproveAccount extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public User $user) { }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via(mixed $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(mixed $notifiable): MailMessage
    {
        $role = strtoupper($this->user->getRoleNames()[0]);

        return (new MailMessage)->greeting(Carbon::timelyGreeting())->subject(Lang::get('Approve New Account'))
            ->line("{$role} {$this->user->full_name}({$this->user->email}) has just created an account and is waiting for its approval.")
            ->line('Please click the button below to view the account.')
            ->action('View Account', route('dashboard.users.show', $this->user))
            ->line('Thank you for using our application!')->success();
    }
}
