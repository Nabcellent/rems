<?php

use App\Http\Controllers\API\MpesaController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\EstateController;
use App\Http\Controllers\Dashboard\LeaseController;
use App\Http\Controllers\Dashboard\PaymentController;
use App\Http\Controllers\Dashboard\PropertyController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\ServiceProviderController;
use App\Http\Controllers\Dashboard\TicketController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UnitController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\WalletController;
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

Route::middleware(['auth', 'verified'])->group(function() {
    Route::prefix('/dashboard')->name("dashboard.")->group(function() {
        Route::get('/', [DashboardController::class, 'default'])->name("default");
        Route::get('/analytics', [DashboardController::class, 'default'])->name("analytics");

        Route::prefix('/wallet')->name('wallet')->group(function() {
            Route::get('/', [WalletController::class, 'index']);
            Route::post('/deposit/{wallet}', [WalletController::class, 'deposit'])->name('.deposit');
        });

        Route::resources([
            "users"             => UserController::class,
            "estates"           => EstateController::class,
            "properties"        => PropertyController::class,
            "units"             => UnitController::class,
            "leases"            => LeaseController::class,
            "services"          => ServiceController::class,
            "service-providers" => ServiceProviderController::class,
            "tickets"           => TicketController::class,
            "transactions"      => TransactionController::class,
            "payments"          => PaymentController::class,
        ]);
    });
});

require __DIR__ . '/auth.php';
