<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\SettingKey;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
            ])->with("roles:id,name")->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

        $data["password"] = Hash::make(setting(SettingKey::DEFAULT_USER_PASSWORD));

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "usr_" . time() . $file->guessClientExtension();
            $file->move("images/users", $data["image"]);
        }

        User::create($data)->assignRole($data["role"])->wallet()->create();

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
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
            $data["image"] = "usr_" . time() . $file->guessClientExtension();
            $file->move("images/users", $data["image"]);

            if($user->image && file_exists("images/users/$user->image")) File::delete("images/users/$user->image");
        }

        $user->update($data);

        return back();
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

        return back();
    }
}
