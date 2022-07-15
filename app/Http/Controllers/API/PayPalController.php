<?php

namespace App\Http\Controllers\API;

use App\Enums\PaymentMethod;
use App\Enums\Status;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Models\PaypalTransaction;
use App\Models\Transaction;
use App\Models\Unit;
use App\Models\Wallet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PayPalController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            "user_id"            => "required|integer|exists:users,id",
            "transactionable_id" => "required|integer",
            "transactionable"    => "required|in:unit,wallet",
            "amount"             => "required|numeric",
            "description"        => "required",
        ]);

        $transactionable = match ($request->input("transactionable")) {
            "unit" => new Unit,
            "wallet" => new Wallet,
        };

        $transactionable = $transactionable->findOrFail($request->input("transactionable_id"));

        $transaction = $transactionable->transactions()->create([
            "user_id"     => $data["user_id"],
            "type"        => TransactionType::PAYMENT,
            "amount"      => $data["amount"],
            "description" => $data["description"],
        ]);

        return response()->json($transaction);
    }

    /**
     * @throws \Exception
     */
    public function update(Request $request, Transaction $transaction)
    {
        $data = $request->validate(["payload" => 'required',]);

        $payLoad = $data["payload"];

        if($payLoad['status'] === Status::COMPLETED->value) {
            $amount = $payLoad["purchase_units"][0]["amount"]["value"];
            $currency = $payLoad["purchase_units"][0]["amount"]["currency_code"];

            $data = [
                "order_id"    => $payLoad["id"],
                "payer_id"    => $payLoad["payer"]["payer_id"],
                "payer_email" => $payLoad["payer"]["email_address"],
                "status"      => Status::COMPLETED,
                "amount"      => convertCurrency($amount, $currency, "KES"),
                "currency"    => "KES",
                "created_at"  => $payLoad["create_time"],
                "updated_at"  => $payLoad["update_time"]
            ];
        } else if(!isset($payLoad["orderID"])) {
            return $transaction->update(["status" => $payLoad["status"]]);
        } else {
            $data = [
                "amount"   => $payLoad["amount"],
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
