<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateEstateRequest extends FormRequest
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
            "name"           => "string",
            "address"        => "string",
            "longitude"      => "numeric",
            "latitude"       => "numeric",
            "status"         => [new Enum(Status::class)],
            "service_charge" => "nullable|numeric",
            "image"          => "nullable|image|max:1024",
        ];
    }
}
