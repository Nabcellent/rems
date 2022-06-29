<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEstateRequest;
use App\Http\Requests\UpdateEstateRequest;
use App\Models\Estate;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Response;
use Inertia\ResponseFactory;

class EstateController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Estate::class, 'estate');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        return inertia('dashboard/estates', [
            "estates"         => Estate::select(["id", "user_id", "name", "address", "status"])
                ->when(user()->hasAllRoles(Role::PROPERTY_MANAGER->value), function(Builder $qry) {
                    return $qry->whereBelongsTo(user());
                })->with("user:id,first_name,last_name,email")->withCount(["properties", "units"])->latest()->get(),
            "canUpdateStatus" => user()->can("updateStatus", Estate::class)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/estates/Upsert", [
            "action"        => "create",
            "googleMapsKey" => config("rems.google.maps.api_key")
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreEstateRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "est_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/estates", $data["image"]);
        }

        $estate = $request->user()->estates()->create($data);

        return redirect()->route("dashboard.estates.index")->with("toast", [
            "message" => "Estate Created!",
            "link"    => ["title" => "View Estate", "href" => route("dashboard.estates.show", ["estate" => $estate])]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Estate $estate
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Estate $estate): Response|ResponseFactory
    {
        return inertia("dashboard/estates/Show", [
            "estate"          => $estate->load([
                "units:id,user_id,unitable_id,house_number,purpose,status,created_at",
                "properties:id,estate_id,user_id,type,created_at",
                "properties.user:id,first_name,last_name,email,phone",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "services:id,name,icon,description",
                "policies:id,policeable_id,policeable_type,description",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ])->loadCount(["properties", "units"]),
            "services"        => Service::select(["id", "name"])->get(),
            "googleMapsKey"   => config("rems.google.maps.api_key"),
            "canChangeOwner"  => user()->hasRole(Role::ADMIN->value),
            "canUpdateStatus" => user()->can("updateStatus", Estate::class)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Estate $estate
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Estate $estate): Response|ResponseFactory
    {
        return inertia("dashboard/estates/Upsert", [
            "estate"        => $estate,
            "action"        => "update",
            "googleMapsKey" => config("rems.google.maps.api_key")
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Estate       $estate
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateEstateRequest $request, Estate $estate): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "est_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/estates", $data["image"]);

            if($estate->image && file_exists("images/estates/$estate->image")) File::delete("images/estates/$estate->image");
        }

        $estate->update($data);

        return back()->with("toast", ["message" => "Estate Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Estate $estate): RedirectResponse
    {
        $estate->delete();

        return back()->with(["toast" => ["message" => "Estate Deleted!", "type" => "info"]]);
    }
}
