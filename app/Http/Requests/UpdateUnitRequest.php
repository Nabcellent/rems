<?php

namespace App\Http\Requests;

use App\Enums\Purpose;
use App\Enums\Status;
use App\Enums\UnitType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateUnitRequest extends FormRequest
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
            "unitable_id"  => "required",
            "unitable"     => "required|in:estate,property",
            "house_number" => "required|string",
            "price"        => "nullable|numeric",
            "rent_amount"  => "nullable|numeric",
            "purpose"      => ["required", new Enum(Purpose::class)],
            "type"         => ["required", new Enum(UnitType::class)],
            "description"  => "nullable|string",
            "image"        => "nullable|image|max:1024",
            "status"       => [new Enum(Status::class)],
        ];
    }
}
