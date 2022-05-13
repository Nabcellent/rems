<?php

namespace App\Http\Requests;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use JetBrains\PhpStorm\ArrayShape;

class StoreUserRequest extends FormRequest
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
        "first_name" => "string",
        "last_name"  => "string",
        "gender"     => "string",
        "image"      => "string",
        "email"      => "string",
        "phone"      => "string",
        "role"       => "\Illuminate\Validation\Rules\Enum[]"
    ])] public function rules(): array
    {
        return [
            "first_name" => "required|string|max:20",
            "last_name"  => "required|string|max:20",
            "gender"     => "nullable|in:male,female",
            "image"      => "nullable|image|max:1024",
            "email"      => "required|string|email|max:100|unique:users",
            "phone"      => "phone:KE",
            "role"       => [new Enum(Role::class)]
        ];
    }
}
