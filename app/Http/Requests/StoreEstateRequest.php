<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreEstateRequest extends FormRequest
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
            "name"           => "required|string",
            "manager_id"     => "nullable|integer|exists:users,id",
            "county"         => "required|in:" . implode(',', getCountyNames()),
            "address"        => "required|string",
            "longitude"      => "required|numeric",
            "latitude"       => "required|numeric",
            "service_charge" => "nullable|numeric",
            "image"          => "nullable|image|max:1024",
            "status"         => [new Enum(Status::class)],
        ];
    }
}
