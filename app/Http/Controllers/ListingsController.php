<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Estate;

class ListingsController extends Controller
{
    public function listings(): Response
    {
        return Inertia::render('Listings', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function show(Estate $estate): Response
    {
        return Inertia::render("SingleListing", [
            'estate' => $estate,
            "googleMapsKey" => config("rems.google.maps.api_key"),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
