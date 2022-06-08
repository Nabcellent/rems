<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
            "registerUrls"   => [
                "owner"            => URL::signedRoute("register", ["role" => Role::OWNER->value]),
                "manager" => URL::signedRoute("register", ["role" => Role::PROPERTY_MANAGER->value]),
                "tenant"           => URL::signedRoute("register", ["role" => Role::TENANT->value]),
                "provider" => URL::signedRoute("register", ["role" => Role::SERVICE_PROVIDER->value]),
            ]
        ]);
    }
}
