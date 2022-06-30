<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAmenityRequest;
use App\Models\Amenity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class AmenityController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Amenity::class, 'amenity');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/amenities', [
            "amenities" => Amenity::select(["id", "title", "icon", "description"])->withCount(["estates", "units"])
                ->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/amenities/Upsert", [
            "action" => "create",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreAmenityRequest $request): RedirectResponse
    {
        Amenity::create($request->validated());

        return redirect()->route("dashboard.amenities.index")->with("toast", [
            "message" => "Amenity Created!",
            "link"    => ["title" => "View All Amenities", "href" => route("dashboard.amenities.index")]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Amenity $amenity): Response|ResponseFactory
    {
        return inertia("dashboard/amenities/Upsert", [
            "action" => "update",
            "amenity" => $amenity,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreAmenityRequest $request, Amenity $amenity): RedirectResponse
    {
        $amenity->update($request->validated());

        return back()->with("toast", ["message" => "Amenity Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Amenity $amenity): RedirectResponse
    {
        $amenity->delete();

        return back()->with(["toast" => ["message" => "Amenity Deleted!", "type" => "info"]]);
    }
}
