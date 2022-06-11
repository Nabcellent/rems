<?php

namespace App\Http\Requests;

use App\Enums\PropertyType;
use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StorePropertyRequest extends FormRequest
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
            "estate_id" => "required|numeric|exists:estates,id",
            "name"      => "required|string|max:100",
            "type"      => ["required", new Enum(PropertyType::class)],
            "image"     => "nullable|image|1024",
            "status"    => ["nullable", new Enum(Status::class)]
        ];
    }
}
