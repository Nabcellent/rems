<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEstateRequest;
use App\Models\Estate;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
            "estates" => Estate::select(["id", "user_id", "name", "address"])
                ->with("user:id,first_name,last_name,email")->withCount(["properties", "units"])->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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

        $request->user()->estates()->create($data);

        return redirect()->route('dashboard.estates.index');
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
            "estate"   => $estate->load([
                "units:id,user_id,unitable_id,house_number,purpose,status,created_at",
                "properties:id,estate_id,user_id,type,created_at",
                "properties.user:id,first_name,last_name,email,phone",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "services:id,name,icon,description",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ])->loadCount(["properties", "units"]),
            "services" => Service::select(["id", "name"])->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Estate $estate
     * @return \Illuminate\Http\Response
     */
    public function edit(Estate $estate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Estate       $estate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estate $estate)
    {
        //
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
