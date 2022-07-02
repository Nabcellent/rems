<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\RentFrequency;
use App\Http\Controllers\Controller;
use App\Models\PaymentPlan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class PaymentPlanController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "lease_id"    => "required|integer|exists:leases,id",
            "deposit"     => "nullable|integer",
            "rent_amount" => "required|integer",
            "frequency"   => [new Enum(RentFrequency::class)],
        ]);

        PaymentPlan::create($data);

        return back()->with("toast", ["message" => "Plan Created!",]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\PaymentPlan  $paymentPlan
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, PaymentPlan $paymentPlan): RedirectResponse
    {
        $data = $request->validate([
            "lease_id"    => "required|integer|exists:leases,id",
            "deposit"     => "nullable|integer",
            "rent_amount" => "required|integer",
            "due_day"     => "required|integer",
            "frequency"   => [new Enum(RentFrequency::class)],
        ]);

        $paymentPlan->update($data);

        return back()->with("toast", ["message" => "Plan Update!",]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\PaymentPlan $paymentPlan
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(PaymentPlan $paymentPlan): RedirectResponse
    {
        $paymentPlan->delete();

        return back()->with(["toast" => ["message" => "Payment Plan Deleted!", "type" => "info"]]);
    }
}
