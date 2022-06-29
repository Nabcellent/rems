<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Role;
use App\Events\UserCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Listeners\ProcessCreatedUser;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create(string $role = null): Response
    {
        $role = match ($role) {
            "manager" => Role::PROPERTY_MANAGER,
            "owner" => Role::OWNER,
            "provider" => Role::SERVICE_PROVIDER,
            default => Role::TENANT
        };

        return Inertia::render("auth/Register", [
            "role" => $role
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param \App\Http\Requests\RegisterRequest $request
     * @return \Illuminate\Http\RedirectResponse
     *
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data["password"] = Hash::make($data["password"]);

        $user = User::create($data)->assignRole($data["role"]);

        UserCreated::dispatch($user);

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
