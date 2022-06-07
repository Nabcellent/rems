<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use JetBrains\PhpStorm\ArrayShape;

class ImageRequest extends FormRequest
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
    #[ArrayShape([
        "imageable"    => "string",
        "imageable_id" => "string",
        "title"        => "string",
        "images.*"     => "string"
    ])] public function rules(): array
    {
        return [
            "imageable"    => "required|string|in:estate,property,unit,room",
            "imageable_id" => "required|integer",
            "title"        => "nullable|string|max:20",
            "images.*"     => "required|image|max:1024",
        ];
    }
}
