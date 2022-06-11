<?php

namespace App\Http\Controllers\Auth;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
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
    public function create(): Response
    {
        return Inertia::render('auth/Register');
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

        $data += [
            "password" => Hash::make($request->input('password')),
        ];

        $user = User::create($data);
        $user->assignRole(Role::TENANT->value);

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
