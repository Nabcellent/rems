<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Models\Estate;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Response;
use Inertia\ResponseFactory;

class PropertyController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Property::class, 'property');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/properties/index', [
            "properties" => Property::select(["id", "estate_id", "user_id", "name", "type", "status"])
                ->when(!user()->can("viewAny", Property::class), function(Builder $qry) {
                    return $qry->whereHas("estate", fn(Builder $qry) => $qry->whereUserId(user()->id))
                        ->orWhere("user_id", user()->id);
                })->with([
                    "user:id,first_name,last_name,email",
                    "estate:id,name,address"
                ])->withCount(["units"])->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/properties/Upsert", [
            "action"  => "create",
            "estates" => Estate::select(["id", "name"])
                ->when(user()->hasRole(Role::PROPERTY_MANAGER->value), fn(Builder $qry) => $qry->whereUserId(user()->id))
                ->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePropertyRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "pro_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/properties", $data["image"]);
        }

        $property = $request->user()->properties()->create($data);

        return redirect()->route("dashboard.properties.index")->with("toast", [
            "message" => "Property Created!",
            "link"    => [
                "title" => "View Property",
                "href"  => route("dashboard.properties.show", ["property" => $property])
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Property $property
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Property $property): Response|ResponseFactory
    {
        return inertia("dashboard/properties/Show", [
            "property"       => $property->load([
                "units:id,user_id,unitable_id,house_number,purpose,status,created_at",
                "estate:id,name,address",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "policies:id,policeable_id,policeable_type,description",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ])->loadCount(["units"]),
            "canChangeOwner" => user()->hasRole(Role::PROPERTY_MANAGER->value)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Property $property
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Property $property): Response|ResponseFactory
    {
        return inertia("dashboard/properties/Upsert", [
            "property" => $property,
            "action"   => "update",
            "estates"  => Estate::select(["id", "name"])
                ->when(user()->hasRole(Role::PROPERTY_MANAGER->value), fn(Builder $qry) => $qry->whereUserId(user()->id))
                ->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Property     $property
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StorePropertyRequest $request, Property $property): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "pro_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/properties", $data["image"]);

            if($property->image && file_exists("images/properties/$property->image")) File::delete("images/properties/$property->image");
        }

        $property->update($data);

        return redirect()->route("dashboard.properties.index")->with("toast", [
            "message" => "Property Updated!",
            "link"    => [
                "title" => "View Property",
                "href"  => route("dashboard.properties.show", ["property" => $property])
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Property $property
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Property $property): RedirectResponse
    {
        $property->delete();

        return back()->with(["toast" => ["message" => "Property Deleted!", "type" => "info"]]);
    }
}
