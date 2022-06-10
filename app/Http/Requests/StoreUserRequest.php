<?php

namespace App\Http\Requests;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
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
    public function rules(): array
    {
        return [
            "first_name" => "required|string|max:20",
            "last_name"  => "required|string|max:20",
            "gender"     => "nullable|in:male,female",
            "image"      => "nullable|image|max:1024",
            "email"      => "required|string|email|max:100|unique:users",
            "phone"      => "nullable|phone:KE",
            'password'   => ["required", Password::defaults()],
            "role"       => ["required", new Enum(Role::class)]
        ];
    }
}
