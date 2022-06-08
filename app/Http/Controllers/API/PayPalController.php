<?php

namespace App\Http\Controllers\API;

use App\Enums\PaymentMethod;
use App\Enums\Status;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Models\PaypalTransaction;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PayPalController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id'        => 'required|integer|exists:users,id',
            'destination_id' => 'required|integer|exists:users,id',
            'amount'         => 'required|numeric',
            'description'    => 'required',
        ]);

        $transaction = Transaction::create([
            "user_id"        => $data["user_id"],
            "destination_id" => $data["destination_id"],
            "type"           => TransactionType::PAYMENT,
            "amount"         => $data["amount"],
            "description"    => $data["description"],
        ]);

        return response()->json($transaction);
    }

    public function update(Request $request, Transaction $transaction)
    {
        $data = $request->validate([
            "payload" => 'required',
        ]);

        $payLoad = $data["payload"];

        if($payLoad['status'] === Status::COMPLETED->value) {
            $data = [
                "order_id"    => $payLoad["id"],
                "payer_id"    => $payLoad["payer"]["payer_id"],
                "payer_email" => $payLoad["payer"]["email_address"],
                "status"      => Status::COMPLETED,
                "amount"      => $payLoad["purchase_units"][0]["amount"]["value"],
                "currency"    => $payLoad["purchase_units"][0]["amount"]["currency_code"],
                "created_at"  => $payLoad["create_time"],
                "updated_at"  => $payLoad["update_time"]
            ];


        } else {
            $data = [
                "order_id" => $payLoad["orderID"],
                "status"   => $payLoad["status"],
            ];
        }

        $transaction->update(["status" => $data["status"]]);

        $paypalTransaction = PaypalTransaction::create($data);

        $transaction->payment()->create([
            "payable_type" => $paypalTransaction->getMorphClass(),
            "payable_id"   => $paypalTransaction->id,
            "amount"       => $data["amount"],
            "method"       => PaymentMethod::PAYPAL,
            "status"       => $data["status"],
        ]);
    }
}
