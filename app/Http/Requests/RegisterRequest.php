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
    public function rules(): array
    {
        return [
            "first_name" => "required_without:username|nullable|string|max:20",
            "last_name"  => "required_without:username|nullable|string|max:20",
            "username"   => "required_without:first_name,last_name|nullable|string|max:50",
            "email"      => "required|string|email|max:100|unique:users",
            "role"       => ["required", new Enum(Role::class)],
            "services"   => "required_if:role," . Role::SERVICE_PROVIDER->value . "|array",
            "password"   => ["required", "confirmed", Password::defaults()],
        ];
    }
}
