<?php

namespace App\Http\Requests;

use App\Enums\RoomType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRoomRequest extends FormRequest
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
            "unit_id" => "required|exists:units,id",
            "type"    => ["required", new Enum(RoomType::class)],
            "length"  => "required_with:width|nullable|numeric",
            "width"   => "required_with:length|nullable|numeric",
            "image"   => "nullable|image|max:1024",
        ];
    }
}
