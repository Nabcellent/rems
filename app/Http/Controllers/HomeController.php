<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'canRegisterAsServiceProvider'     => Service::exists(),
        ]);
    }
}
