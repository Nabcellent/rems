<?php

namespace App\Http\Requests;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateUserRequest extends FormRequest
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
            "first_name" => "string|max:20",
            "last_name"  => "string|max:20",
            "gender"     => "nullable|in:male,female",
            "image"      => "nullable|image|max:1024",
            "phone"      => "phone:KE",
            "role"       => [new Enum(Role::class)]
        ];
    }
}
