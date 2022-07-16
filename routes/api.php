<?php

use App\Http\Controllers\API\MpesaController;
use App\Http\Controllers\API\PayPalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/mpesa')->group(function() {
    Route::post('/stk/initiate', [MpesaController::class, 'initiatePush']);
    Route::post('/stk/query-status', [MpesaController::class, 'stkStatus']);
    Route::put('/stk/update-status', [MpesaController::class, 'updateStatus']);
});
Route::prefix('/paypal')->group(function() {
    Route::post('/transactions', [PayPalController::class, 'store']);
    Route::put('/transactions/{transaction}', [PayPalController::class, 'update']);
});
