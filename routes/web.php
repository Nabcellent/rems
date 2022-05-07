<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\EstateController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [HomeController::class, 'home'])->name("home");

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->name("dashboard.")->group(function() {
    Route::get('/', [DashboardController::class, 'default'])->name("default");
    Route::get('/analytics', [DashboardController::class, 'default'])->name("analytics");

    Route::resources([
        "estates" => EstateController::class
    ]);
});

require __DIR__ . '/auth.php';
