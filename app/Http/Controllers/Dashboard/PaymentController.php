<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class PaymentController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Payment::class, 'payment');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/payments', [
            "payments"        => Payment::select([
                "id",
                "transaction_id",
                "payable_id",
                "payable_type",
                "amount",
                "method",
                "status",
                "created_at"
            ])->with([
                "transaction:id,user_id,type,description",
                "transaction.user:id,first_name,last_name,email",
            ])->latest()->get(),
            "canUpdateStatus" => user()->can("updateStatus", Payment::class)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Payment $payment
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Payment $payment): Response|ResponseFactory
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Payment $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Payment      $payment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            "status" => "string"
        ]);

        $payment->update($data);

        return back()->with(["toast" => ["message" => "Payment Updated!"]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Payment $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
