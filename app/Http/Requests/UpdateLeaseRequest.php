<?php

namespace App\Http\Requests;

use App\Enums\Frequency;
use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateLeaseRequest extends FormRequest
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
        return [
            "user_id"             => "exists:users,id",
            "unit_id"             => "exists:units,id",
            "plans.*"             => "array|min:1",
            "plans.*.deposit"     => "integer",
            "plans.*.rent_amount" => "integer",
            "plans.*.due_day"     => "integer",
            "plans.*.frequency"   => [new Enum(Frequency::class)],
            "status"              => [new Enum(Status::class)],
            "expires_at"          => "date|after:tomorrow",
        ];
    }

    public function messages(): array
    {
        return [
            "plans.*.deposit.integer" => "Deposit for plan #:position must be an integer."
        ];
    }
}
