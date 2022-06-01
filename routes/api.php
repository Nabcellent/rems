<?php

use App\Http\Controllers\API\MpesaController;
use DrH\Mpesa\Http\Controllers\StkController;
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
    Route::post('/stk/initiate', [StkController::class, 'initiatePush']);
    Route::post('/stk/query-status', [MpesaController::class, 'stkStatus']);
});
