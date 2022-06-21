<?php

namespace App\Listeners;

use App\Enums\Status;
use App\Models\Payment;
use DrH\Mpesa\Events\StkPushPaymentFailedEvent;

class StkPaymentFailed
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
     * @param \DrH\Mpesa\Events\StkPushPaymentFailedEvent $event
     * @return void
     */
    public function handle(StkPushPaymentFailedEvent $event): void
    {
        $payment = Payment::wherePayableId($event->stkCallback->request->id)->firstOrFail();

        if($payment->status == Status::FAILED) return;

        $payment->status = Status::FAILED;
        $payment->save();

        $payment->transaction->update(["status" => Status::FAILED]);
    }
}
