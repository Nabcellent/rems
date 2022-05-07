<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Payment;
use App\Models\Transaction;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function default(): Response
    {
        return Inertia::render('dashboard', [
            "estates_count"       => Estate::count(),
            "revenue"             => Payment::whereStatus(Status::COMPLETED)->sum("amount"),
            "latest_transactions" => Transaction::latest()->take(5)->with('user:id,email')->get()
        ]);
    }
}
