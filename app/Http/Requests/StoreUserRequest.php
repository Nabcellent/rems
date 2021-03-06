<?php

namespace App\Http\Requests;

use App\Enums\Role;
use App\Enums\Status;
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
            "first_name"      => "required_without:username|nullable|string|max:20",
            "last_name"       => "required_without:username|nullable|string|max:20",
            "username"        => "required_without:first_name,last_name|nullable|string|max:50",
            "gender"          => "nullable|in:male,female",
            "image"           => "nullable|image|max:1024",
            "email"           => "required|string|email|max:100|unique:users",
            "phone"           => "nullable|phone:KE",
            "services"        => "required_if:role," . Role::SERVICE_PROVIDER->value . "|array",
            "password"        => ["required", Password::defaults()],
            "role"            => ["required", new Enum(Role::class)],
            "status"          => [new Enum(Status::class)],
            "createsOwnerFor" => "nullable|array:id,name"
        ];
    }

    public function messages(): array
    {
        return [
            "createsOwnerFor.array" => "Invalid input, please refresh and retry!"
        ];
    }
}
