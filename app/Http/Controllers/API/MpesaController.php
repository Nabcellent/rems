<?php

namespace App\Http\Controllers\API;

use App\Enums\Description;
use App\Enums\PaymentMethod;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Transaction;
use DrH\Mpesa\Entities\MpesaStkCallback;
use DrH\Mpesa\Facades\STK;
use DrH\Mpesa\Http\Requests\StkRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MpesaController extends Controller
{
    /**
     * @param StkRequest $request
     * @return JsonResponse
     */
    public function initiatePush(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id'        => 'required|integer|exists:users,id',
            'destination_id' => 'required|integer|exists:users,id',
            'amount'         => 'required|numeric',
            'phone'          => 'required',
            'reference'      => 'required',
            'description'    => 'required',
        ]);

        try {
            $transaction = Transaction::create([
                "user_id"        => $data["user_id"],
                "destination_id" => $data["destination_id"],
                "type"           => TransactionType::PAYMENT,
                "amount"         => $data["amount"],
                "description"    => $data["description"]
            ]);

            $stk = STK::push($data["amount"], $data["phone"], $data["reference"], $data["description"]);

            $transaction->payment()->create([
                "payable_type" => $stk->getMorphClass(),
                "payable_id"   => $stk->id,
                "amount"       => $data["amount"],
                "method"       => PaymentMethod::MPESA,
            ]);

            $stk->relation_id = $transaction->id;
            $stk->save();
        } catch (Exception $exception) {
            $stk = [
                'ResponseCode'        => 900,
                'ResponseDescription' => 'Invalid request',
                'extra'               => $exception->getMessage()
            ];
        }

        return response()->json($stk);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function stkStatus(Request $request): JsonResponse
    {
        $request->validate(["request_id" => "required"]);

        try {
            $stkStatus = STK::status($request->input("request_id"));

            return response()->json($stkStatus);
        } catch (Exception $err) {
            return response()->json(json_decode($err->getMessage()));
        }
    }
}
