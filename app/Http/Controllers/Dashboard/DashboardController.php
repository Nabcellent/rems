<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Payment;
use App\Models\ServiceProvider;
use App\Models\Transaction;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function default(): Response
    {
        return Inertia::render('dashboard', [
            "estates_count"           => Estate::count(),
            "service_providers_count" => ServiceProvider::count(),
            "my_estates_count"        => Request::user()->estates()->count(),
            "wallet_balance"          => Request::user()->wallet->balance,
            "revenue"                 => Payment::whereStatus(Status::COMPLETED)->sum("amount"),
            "latest_transactions"     => Transaction::latest()->take(10)->with([
                "user:id,email,last_name",
                "destination:id,email,last_name",
                "payment:id,method"
            ])->get(),
        ]);
    }
}
