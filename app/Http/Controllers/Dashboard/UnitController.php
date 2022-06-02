<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/units', [
            "units" => Unit::select([
                "id",
                "unitable_id",
                "unitable_type",
                "user_id",
                "house_number",
                "purpose",
                "description",
                "status",
                "created_at"
            ])->with([
                "user:id,first_name,last_name,email",
                "unitable"
            ])->latest()->get()
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
     * @param \App\Models\Unit $unit
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Unit $unit): Response|ResponseFactory
    {
        return inertia("dashboard/units/Show", [
            "unit" => $unit->load([
                "unitable",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "leases" => fn(HasMany $qry) => $qry->orderByDesc('status'),
                "leases.user:id,first_name,last_name,email,phone",
                "rooms:id,unit_id,type,created_at",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Unit $unit
     * @return \Illuminate\Http\Response
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Unit         $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Unit $unit)
    {
        //
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
