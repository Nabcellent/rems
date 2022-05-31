<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\EstateController;
use App\Http\Controllers\Dashboard\LeaseController;
use App\Http\Controllers\Dashboard\PropertyController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UnitController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

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

    Route::get('/users/service-providers', [UserController::class, 'getServiceProviders'])
        ->name("users.service-providers");

    Route::resources([
        "users"        => UserController::class,
        "estates"      => EstateController::class,
        "properties"   => PropertyController::class,
        "units"        => UnitController::class,
        "leases"       => LeaseController::class,
        "services"     => ServiceController::class,
        "transactions" => TransactionController::class,
    ]);
});

require __DIR__ . '/auth.php';
