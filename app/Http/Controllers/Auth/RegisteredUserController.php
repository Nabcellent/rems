<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Role;
use App\Events\UserCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Listeners\ProcessCreatedUser;
use App\Models\Service;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
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
        $props["role"] = match ($role) {
            "manager" => Role::PROPERTY_MANAGER,
            "owner" => Role::OWNER,
            "provider" => Role::SERVICE_PROVIDER,
            default => Role::TENANT
        };

        if($props["role"] === Role::SERVICE_PROVIDER) $props["services"] = Service::select(["id", "name"])->get();

        return Inertia::render("auth/Register", $props);
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

        if($user->hasRole(Role::SERVICE_PROVIDER)) $user->services()
            ->attach(Arr::map($data["services"], fn(array $service) => ["service_id" => $service["id"]]));

        UserCreated::dispatch($user);

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
