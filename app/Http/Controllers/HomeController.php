<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        try {
            $canRegisterAsServiceProvider = Service::exists();
        } catch (Exception $err) {
            Log::critical($err);

            $canRegisterAsServiceProvider = false;
        }

        return Inertia::render('Home', [
            'canLogin'                     => Route::has('login'),
            'canRegister'                  => Route::has('register'),
            'canRegisterAsServiceProvider' => $canRegisterAsServiceProvider,
        ]);
    }
}
