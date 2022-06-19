<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Lease;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class LeaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/leases', [
            "leases" => Lease::select([
                "id",
                "user_id",
                "unit_id",
                "rent_amount",
                "start_date",
                "end_date",
                "status",
                "created_at"
            ])->with([
                "unit.user:id,first_name,last_name,email",
                "user:id,first_name,last_name,email",
            ])->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/leases/Upsert", [
            "action"  => "create",
            "users"   => User::select(["id", "email"])->get(),
            "estates" => Estate::select(["id", "name"])->when(!user()->isAdmin(), function(Builder $qry) {
                return $qry->whereUserId(user()->id)
                    ->orWhereHas("properties", fn(Builder $qry) => $qry->whereUserId(user()->id)
                        ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id)))
                    ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id));
            })->with("properties:id,estate_id,name")->get()
        ]);
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
     * @param \App\Models\Lease $lease
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Lease $lease): Response|ResponseFactory
    {
        return inertia("dashboard/leases/Show", [
            "lease" => $lease->load([
                "unit",
                "unit.user:id,email,phone",
                "user:id,email,phone",
                "user.roles:id,name",
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Http\Response
     */
    public function edit(Lease $lease)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Lease        $lease
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lease $lease)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Lease $lease
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Lease $lease): RedirectResponse
    {
        $lease->delete();

        return back()->with(["toast" => ["message" => "Lease Deleted!", "type" => "info"]]);
    }
}
