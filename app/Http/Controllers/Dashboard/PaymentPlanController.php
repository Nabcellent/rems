<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Frequency;
use App\Http\Controllers\Controller;
use App\Models\Lease;
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
            "frequency"   => [new Enum(Frequency::class)],
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
            "lease_id"    => "integer|exists:leases,id",
            "deposit"     => "nullable|integer",
            "rent_amount" => "integer",
            "due_day"     => "integer",
            "is_default"  => "boolean",
            "frequency"   => [new Enum(Frequency::class)],
        ]);

        if($request->filled("is_default")) PaymentPlan::whereIsDefault(true)->update(["is_default" => false]);

        $paymentPlan->update($data);

        return back()->with("toast", ["message" => "Plan Update!"]);
    }

    public function reset(Lease $lease)
    {
        $lease->paymentPlans()->update(["is_default" => false]);

        return back()->with("toast", ["message" => "All payment plans have been reset!"]);
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
