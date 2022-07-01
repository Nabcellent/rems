<?php

namespace App\Http\Requests;

use App\Enums\Role;
use App\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
            "phone"      => "nullable|phone:KE",
            "role"       => ["nullable", new Enum(Role::class)],
            'email'      => ["sometimes", Rule::unique('users')->ignore($this->route()->parameter("user")->id)],
            "status"     => new Enum(Status::class),

//            "password"              => "required_with:current_password,null|confirmed|min:7",
//            "password_confirmation" => "required_with:password"
        ];
    }

    public function messages()
    {
        return [
            "current"
        ];
    }
}
