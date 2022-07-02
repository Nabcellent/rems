<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Amenity;
use App\Models\Estate;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use Inertia\Response;
use Inertia\ResponseFactory;

class UnitController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Unit::class, 'unit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/units/index', [
            "units" => Unit::select([
                "id",
                "unitable_id",
                "unitable_type",
                "user_id",
                "house_number",
                "purpose",
                "type",
                "description",
                "status",
                "created_at"
            ])->when(!user()->isAdmin(), fn(Builder $qry) => $qry->whereUserId(user()->id))->with([
                "user:id,first_name,last_name,email",
                "unitable"
            ])->withCount("rooms")->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/units/Upsert", [
            "action"  => "create",
            "estates" => Estate::select(["id", "name"])
                ->when(!user()->isAdmin(), fn(Builder $qry) => $qry->whereUserId(user()->id))
                ->with("properties:id,estate_id,name")->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreUnitRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $unitable = match ($request->input(["unitable"])) {
            "estate" => new Estate,
            "property" => new Property,
        };

        $unitable = $unitable->findOrFail($request->input("unitable_id"));

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "unit_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/units", $data["image"]);
        }

        $unit = $unitable->units()->create([...$data, "user_id" => user()->id]);

        return redirect()->route("dashboard.units.index")->with("toast", [
            "message" => "Unit Created!",
            "link"    => ["title" => "View Unit", "href" => route("dashboard.units.show", ["unit" => $unit])]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Unit $unit
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Unit $unit): Response|ResponseFactory
    {
        return inertia("dashboard/units/Show", [
            "unit"           => $unit->load([
                "unitable",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "leases" => fn(HasMany $qry) => $qry->orderByRaw('status, created_at'),
                "leases.user:id,first_name,last_name,email,phone",
                "rooms:id,unit_id,type,image,length,width,description",
                "amenities:id,title,icon,description",
                "policies:id,policeable_id,policeable_type,description",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ]),
            "amenities"      => Amenity::select(["id", "title"])->get(),
            "canChangeOwner" => user()->can("changeOwner", Unit::class),
            "canUpdateStatus" => user()->can("updateStatus", Unit::class)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Unit $unit
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Unit $unit): Response|ResponseFactory
    {
        return inertia("dashboard/units/Upsert", [
            "action"  => "update",
            "unit"    => $unit->load("unitable"),
            "estates" => Estate::select(["id", "name"])->when(!user()->isAdmin(), function(Builder $qry) {
                return $qry->whereUserId(user()->id)
                    ->orWhereHas("properties", fn(Builder $qry) => $qry->whereUserId(user()->id)
                        ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id)))
                    ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id));
            })->with("properties:id,estate_id,name")->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Unit         $unit
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateUnitRequest $request, Unit $unit): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "unit_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/units", $data["image"]);

            if($unit->image && file_exists("images/units/$unit->image")) File::delete("images/units/$unit->image");
        }

        $unit->update($data);

        return back()->with("toast", [
            "message" => "Unit Updated!",
            "link"    => [
                "title" => "View Unit",
                "href"  => route("dashboard.units.show", ["unit" => $unit])
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Unit $unit
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Unit $unit): RedirectResponse
    {
        $unit->delete();

        return back()->with(["toast" => ["message" => "Unit Deleted!", "type" => "info"]]);
    }
}
