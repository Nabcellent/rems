<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Payment;
use App\Models\ServiceProvider;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function default(): Response
    {
        $transactions = Transaction::when(!user()->isAdmin(), fn($qry) => $qry->whereUserId(user()->id));

        return Inertia::render('dashboard/index', [
            "new_estates_count"       => Estate::whereDate('created_at', Carbon::today())->count(),
            "new_users_count"         => User::whereDate('created_at', Carbon::today())->count(),
            "new_tickets_count"       => Ticket::whereDate('created_at', Carbon::today())->count(),
            "service_providers_count" => ServiceProvider::count(),
            "my_estates_count"        => Request::user()->estates()->count(),
            "wallet_balance"          => Request::user()->wallet?->balance ?? 0,
            "transactions_count"      => $transactions->count(),
            "revenue"                 => Payment::whereStatus(Status::COMPLETED)->sum("amount"),
            "rent_figures"            => user()->hasRole(Role::TENANT) ? user()->rentFigures() : null,
            "latest_transactions"     => $transactions->latest()->take(10)->with([
                "user:id,email,last_name",
                "transactionable:id,user_id",
                "transactionable.user:id,email,last_name",
                "payment:id,method"
            ])->get(),
            "canUpdateStatus"         => user()->can("updateStatus", Transaction::class)
        ]);
    }
}
