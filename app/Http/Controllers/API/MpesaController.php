<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use DrH\Mpesa\Facades\STK;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MpesaController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function stkStatus(Request $request): JsonResponse
    {
        $request->validate(["request_id" => "required"]);

        try {
            return response()->json(STK::status($request->input("request_id")));
        } catch (Exception $err) {
            return response()->json(json_decode($err->getMessage()));
        }
    }
}
