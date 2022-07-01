<?php

namespace App\Http\Requests;

use App\Enums\RentFrequency;
use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreLeaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
//        dd($this->input("plans"));
        return [
            "user_id"           => "required|exists:users,id",
            "unit_id"           => "required|exists:units,id",
            "plans.*"             => "required|array:deposit,amount,frequency|min:1",
            "plans.*.deposit"   => "nullable|integer",
            "plans.*.amount"    => "required|integer",
            "plans.*.frequency" => [new Enum(RentFrequency::class)],
            "status"            => [new Enum(Status::class)],
            "expires_at"        => "required|date|after:tomorrow",
        ];
    }

    public function messages(): array
    {
        return [
            "plans.*.deposit.integer" => "Deposit for plan #:position must be an integer."
        ];
    }
}
