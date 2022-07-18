<?php

namespace App\Http\Requests;

use App\Enums\Description;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class PaymentRequest extends FormRequest
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
            "description"    => ["required", new Enum(Description::class)],
            "unit"           => Rule::requiredIf(fn() => in_array($this->input("description"), [
                Description::RENT_PAYMENT->value,
                Description::RENT_DEPOSIT->value
            ])),
            "transaction_id" => "required|exists:transactions,id"
        ];
    }
}
