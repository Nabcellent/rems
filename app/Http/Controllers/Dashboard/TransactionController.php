<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class TransactionController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Transaction::class, 'transaction');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/transactions/index', [
            "transactions"    => Transaction::select([
                "id",
                "user_id",
                "transactionable_id",
                "transactionable_type",
                "amount",
                "description",
                "status",
                "created_at"
            ])->when(!user()->isAdmin(), fn(Builder $qry) => $qry->whereUserId(user()->id))->with([
                "user:id,first_name,last_name,email,phone",
                "user.roles",
                "transactionable:id,user_id",
                "transactionable.user:id,first_name,last_name,email,phone",
                "transactionable.user.roles",
            ])->latest()->get()->map(fn(Transaction $transaction) => [
                ...$transaction->toArray(),
                "can" => [
                    "edit"    => user()->can("update", $transaction),
                    "view"    => user()->can("view", $transaction),
                    "destroy" => user()->can("delete", $transaction)
                ]
            ]),
            "canUpdateStatus" => user()->can("updateStatus", Transaction::class)
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
     * @param \App\Models\Transaction $transaction
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Transaction $transaction): Response|ResponseFactory
    {
        return inertia("dashboard/transactions/Show", [
            "transaction" => $transaction->load([
                "user:id,first_name,last_name,email,phone",
                "user.roles",
                "transactionable:id,user_id",
                "transactionable.user:id,first_name,last_name,email,phone",
                "transactionable.user.roles",
                "payment:id,transaction_id,payable_id,payable_type,amount,method,status",
                "payment.payable",
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Transaction $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Transaction $transaction): RedirectResponse
    {
        $data = $request->validate([
            "status" => "string"
        ]);

        $transaction->update($data);

        return back()->with(["toast" => ["message" => "Transaction Updated!"]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Transaction $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
