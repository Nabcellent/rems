<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/properties', [
            "properties" => Property::select(["id", "estate_id", "user_id", "type"])->with([
                "user:id,first_name,last_name,email",
                "estate:id,name,address"
            ])->withCount(["units"])->latest()->get()
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
            "property" => $property->load([
                "units:id,user_id,unitable_id,house_number,purpose,status,created_at",
                "estate:id,name,address",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name"
            ])->loadCount(["units"])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Property $property
     * @return \Illuminate\Http\Response
     */
    public function edit(Property $property)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Property     $property
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Property $property)
    {

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

        return back()->with(["toast" => ["message" => "Property Deleted!"]]);
    }
}
