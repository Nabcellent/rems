<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Description;
use App\Enums\PaymentMethod;
use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Inertia\ResponseFactory;

class WalletController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/Wallet', [
            "wallet"          => user()->wallet->load('user:id,first_name,last_name,email,phone'),
            "transactions"    => user()->transactions()->select(["id", "user_id", "amount", "status", "created_at"])
                ->whereDescription(Description::WALLET_DEPOSIT)->latest()->take(20)
                ->with("payment:id,transaction_id,method")->get(),
            "total_spent"     => Payment::whereMethod(PaymentMethod::WALLET)->whereStatus(Status::COMPLETED)
                ->sum("amount"),
            "total_deposited" => Transaction::whereDescription(Description::WALLET_DEPOSIT)
                ->whereStatus(Status::COMPLETED)->sum("amount"),
            "last_top_up"     => Transaction::whereDescription(Description::WALLET_DEPOSIT)->latest()
                ->first()?->created_at
        ]);
    }

    public function credit(Request $request, User $user): RedirectResponse
    {
        $user->wallet->balance += $request->input('amount');
        $user->wallet->save();

        return back()->with(["toast" => ["message" => "Wallet Loaded! New balance -> {$user->wallet->balance}"]]);
    }

    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function debit(Request $request, User $user, Transaction $transaction): JsonResponse
    {
        $transaction->payment()->create([
            "payable_type" => $user->wallet->getMorphClass(),
            "payable_id"   => $user->wallet->id,
            "amount"       => $request->input('amount'),
            "method"       => PaymentMethod::WALLET,
        ]);

        if($user->wallet->balance < $request->input('amount')) {
            $transaction->status = Status::FAILED;
            $transaction->save();

            throw ValidationException::withMessages([
                'amount' => __('Insufficient wallet balance!'),
            ]);
        }

        $user->wallet->balance -= $request->input('amount');
        $user->wallet->save();

        $transaction->status = Status::COMPLETED;
        $transaction->payment->status = Status::COMPLETED;
        $transaction->save();
        $transaction->payment->save();

        return response()->json(["status" => Status::COMPLETED]);
    }
}
