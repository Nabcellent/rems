<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            "imageable"    => "required|string|in:estate,property,unit,room",
            "imageable_id" => "required|integer",
            "title"        => "nullable|string|max:20",
            "images.*"     => "required|image|max:1024",
        ];
    }
}
