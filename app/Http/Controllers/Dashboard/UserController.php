<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\SettingKey;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Settings\UserSettings;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Inertia\ResponseFactory;
use Propaganistas\LaravelPhone\PhoneNumber;

class UserController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/users', [
            "users" => User::select([
                "id",
                "first_name",
                "last_name",
                "phone",
                "email",
                "image",
                "status",
                "created_at"
            ])->when(user()->hasAllRoles(\App\Enums\Role::PROPERTY_MANAGER->value), function(Builder $qry) {
                return $qry->whereHas("roles", fn(Builder $qry) => $qry->whereName(\App\Enums\Role::OWNER->value));
            })->with("roles:id,name")->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/users/Upsert", [
            "roles"           => Role::pluck("name"),
            "action"          => "create",
            "defaultPassword" => app(UserSettings::class)->default_password
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if(isset($data["phone"])) {
            $data["phone"] = PhoneNumber::make($data["phone"], 'KE');

            if(User::wherePhone($data["phone"])->exists()) {
                throw ValidationException::withMessages([
                    'phone' => __('The phone has already been taken.'),
                ]);
            }
        }

        $data["password"] = Hash::make($data["password"] ?? app(UserSettings::class)->default_password);

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "usr_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/users", $data["image"]);
        }

        $user = User::create($data)->assignRole($data["role"]);

        return redirect()->route("dashboard.users.index")->with("toast", [
            "message" => "User Created!",
            "link"    => ["title" => "View User", "href" => route("dashboard.users.show", ["user" => $user])]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(User $user)
    {
        return inertia("dashboard/users/Show", [
            "user" => $user->load([
                "wallet:id,user_id,balance"
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(User $user): Response|ResponseFactory
    {
        return inertia("dashboard/users/Upsert", [
            "user"   => $user,
            "roles"  => Role::pluck("name"),
            "action" => "update",
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User         $user
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        if(isset($data["phone"])) {
            $data["phone"] = PhoneNumber::make($data["phone"], 'KE');

            if(User::wherePhone($data["phone"])->whereKeyNot($user->id)->exists()) {
                throw ValidationException::withMessages([
                    'phone' => __('The phone has already been taken.'),
                ]);
            }
        }

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "usr_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/users", $data["image"]);

            if($user->image && file_exists("images/users/$user->image")) File::delete("images/users/$user->image");
        }

        $user->update($data);

        return redirect()->route("dashboard.users.index")->with("toast", [
            "message" => "User Updated!",
            "link"    => ["title" => "View User", "href" => route("dashboard.users.show", ["user" => $user])]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return back()->with(["toast" => ["message" => "User Deleted!", "type" => "info"]]);
    }
}
