<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Description;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class WalletController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/Wallet', [
            'wallet'       => user()->wallet->load('user:id,first_name,last_name,email,phone'),
            'transactions' => user()->transactions()->select(["id", "user_id", "amount", "status", "created_at"])
                ->whereDescription(Description::WALLET_DEPOSIT)->latest()->take(20)
                ->with("payment:id,transaction_id,method")->get(),
            "last_top_up"  => Transaction::whereDescription(Description::WALLET_DEPOSIT)->latest()->first()?->created_at
        ]);
    }

    public function deposit(Request $request, User $user): RedirectResponse
    {
        $user->wallet->balance += $request->input('amount');
        $user->wallet->save();

        return back()->with(["toast" => ["message" => "Wallet Loaded! New balance -> {$user->wallet->balance}"]]);
    }
}
