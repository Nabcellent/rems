<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class WalletController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/Wallet', [
            'wallet' => request()->user()->wallet->load('user:id,first_name,last_name,email,phone')
        ]);
    }
}
