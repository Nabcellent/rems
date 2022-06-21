<?php

namespace App\Listeners;

use App\Enums\Status;
use App\Models\Payment;
use DrH\Mpesa\Events\StkPushPaymentSuccessEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class StkPaymentReceived
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
     * @param \DrH\Mpesa\Events\StkPushPaymentSuccessEvent $event
     * @return void
     */
    public function handle(StkPushPaymentSuccessEvent $event): void
    {
        $payment = Payment::wherePayableId($event->stkCallback->request->id)->firstOrFail();

        if($payment->status == Status::COMPLETED) return;

        $payment->update(["status" => Status::COMPLETED]);
        $payment->transaction->update(["status" => Status::COMPLETED]);
    }
}
