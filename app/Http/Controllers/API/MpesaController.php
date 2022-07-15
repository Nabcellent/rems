<?php

namespace App\Http\Controllers\API;

use App\Enums\PaymentMethod;
use App\Enums\Status;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Unit;
use App\Models\Wallet;
use DrH\Mpesa\Entities\MpesaStkCallback;
use DrH\Mpesa\Events\StkPushPaymentFailedEvent;
use DrH\Mpesa\Events\StkPushPaymentSuccessEvent;
use DrH\Mpesa\Facades\STK;
use DrH\Mpesa\Http\Requests\StkRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Enum;

class MpesaController extends Controller
{
    /**
     * @param StkRequest $request
     * @return JsonResponse
     */
    public function initiatePush(Request $request): JsonResponse
    {
        $data = $request->validate([
            "user_id"            => "required|integer|exists:users,id",
            "transactionable_id" => "required|integer",
            "transactionable"    => "required|in:unit,wallet",
            "amount"             => "required|numeric",
            "phone"              => "required",
            "reference"          => "required",
            "description"        => "required",
        ]);

        $transactionable = match ($request->input("transactionable")) {
            "unit" => new Unit,
            "wallet" => new Wallet,
        };

        $transactionable = $transactionable->findOrFail($request->input("transactionable_id"));

        $transaction = $transactionable->transactions()->create([
            "user_id"        => $data["user_id"],
            "type"           => TransactionType::PAYMENT,
            "amount"         => $data["amount"],
            "description"    => $data["description"]
        ]);

        try {
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
            Log::error($exception);

            $stk = [
                'ResponseCode'        => 900,
                'ResponseDescription' => 'Invalid request',
                'extra'               => $exception->getMessage()
            ];
        }

        return response()->json(["stk_request" => $stk, "transaction" => $transaction]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function stkStatus(Request $request): JsonResponse
    {
        $request->validate(["request_id" => "required", "amount" => "required|numeric|max:70000"]);

        try {
            $status = STK::status($request->input("request_id"));

            if(!isset($status->errorMessage)) {
                $attributes = [
                    "merchant_request_id" => $status["MerchantRequestID"],
                    "checkout_request_id" => $status["CheckoutRequestID"],
                    "result_code"         => $status["ResultCode"],
                    "result_desc"         => $status["ResultDesc"],
                    "amount"              => $request->input("amount"),
                ];

                $callback = MpesaStkCallback::create($attributes);

                $callback->result_code == 0 ? StkPushPaymentSuccessEvent::dispatch($callback, $status)
                    : StkPushPaymentFailedEvent::dispatch($callback, $status);
            }

            return response()->json($status);
        } catch (Exception $err) {
            Log::error($err);

            return response()->json(json_decode($err->getMessage()));
        }
    }

    public function updateStatus(Request $request)
    {
        $data = $request->validate([
            "id"     => "integer|exists:transactions,id",
            "status" => ["required", new Enum(Status::class)]
        ]);

        Transaction::findOrFail($data["id"])->update($data);
    }
}
