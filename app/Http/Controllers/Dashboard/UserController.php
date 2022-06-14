<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Estate;
use App\Models\Property;
use App\Models\Role as RoleModel;
use App\Models\Unit;
use App\Models\User;
use App\Settings\UserSettings;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $estateIds = user()->estates()->pluck("id");

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
            ])->when(user()->hasAllRoles(Role::PROPERTY_MANAGER->value), function(Builder $qry) use ($estateIds) {
                return $qry->whereHas("roles", fn(Builder $qry) => $qry->whereName(Role::OWNER->value))
                    ->whereHas("properties", function(Builder $qry) use ($estateIds) {
                        return $qry->whereIn("estate_id", $estateIds);
                    })->orWhereHas("units", function(Builder $qry) use ($estateIds) {
                        return $qry->where("unitable_type", Estate::class)->whereIn("unitable_id", $estateIds);
                    });
            })->with("roles:id,name")->latest()->get(),
        ]);
    }

    public function owners(): JsonResponse
    {
        $estateIds = user()->estates()->pluck("id");

        return response()->json([
            "users" => User::select(["id", "email",])
                ->when(user()->hasAllRoles(Role::PROPERTY_MANAGER->value), function(Builder $qry) use ($estateIds) {
                    return $qry->whereHas("roles", fn(Builder $qry) => $qry->whereName(Role::OWNER->value))
                        ->whereHas("properties", function(Builder $qry) use ($estateIds) {
                            return $qry->whereIn("estate_id", $estateIds);
                        })->orWhereHas("units", function(Builder $qry) use ($estateIds) {
                            return $qry->where("unitable_type", Estate::class)->whereIn("unitable_id", $estateIds);
                        });
                })->latest("email")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(Request $request): Response|ResponseFactory
    {
        $props = [
            "roles"           => RoleModel::when(user()->hasAllRoles(Role::PROPERTY_MANAGER->value), function(Builder $qry) {
                return $qry->whereIn("name", [Role::OWNER->value, Role::SERVICE_PROVIDER->value]);
            })->when($request->has("entity"), fn(Builder $qry) => $qry->whereName(Role::OWNER->value))->pluck("name"),
            "action"          => "create",
            "defaultPassword" => app(UserSettings::class)->default_password,
        ];

        if($request->has("entity")) {
            $props["createsOwnerFor"] = [
                "id"   => $request->input("entityId"),
                "name" => $request->input("entity")
            ];
        }

        return inertia("dashboard/users/Upsert", $props);
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

        if($request->has("createsOwnerFor")) {
            $propertyModel = match ($data["createsOwnerFor"]["name"]) {
                "estate" => new Estate,
                "property" => new Property,
                "unit" => new Unit
            };

            $propertyModel = $propertyModel->findOrFail($data["createsOwnerFor"]["id"]);
            $propertyModel->user_id = $user->id;
            $propertyModel->save();
        }

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
    public function show(User $user): Response|ResponseFactory
    {
        return inertia("dashboard/users/Show", [
            "user" => $user->load([
                "wallet:id,user_id,balance"
            ])
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function showProfile(): Response|ResponseFactory
    {
        return inertia("dashboard/users/Show", [
            "user" => user()->load([
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
            "roles"  => RoleModel::pluck("name"),
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

    public function settings(): Response|ResponseFactory
    {
        return inertia('dashboard/users/Settings', [
            "user" => user()
        ]);
    }
}
