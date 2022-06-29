<?php

namespace App\Http\Requests;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
use JetBrains\PhpStorm\ArrayShape;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return auth()->guest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    #[ArrayShape([
        "first_name" => "string",
        "last_name"  => "string",
        "email"      => "string",
        "role"       => "array",
        "password"   => "array"
    ])] public function rules(): array
    {
        return [
            "first_name" => "required|string|max:20",
            "last_name"  => "required|string|max:20",
            "email"      => "required|string|email|max:100|unique:users",
            "role"       => ["required", new Enum(Role::class)],
            "password"   => ["required", "confirmed", Password::defaults()],
        ];
    }
}
