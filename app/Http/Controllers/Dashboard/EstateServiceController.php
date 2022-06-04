<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EstateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EstateServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "estate_id"   => "required|exists:estates,id",
            "service_id"  => "required|exists:services,id",
            "description" => "string",
        ]);

        EstateService::create($data);

        return back()->with("toast", ["message" => "Service Added!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\EstateService $estateService
     * @return \Illuminate\Http\Response
     */
    public function show(EstateService $estateService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\EstateService $estateService
     * @return \Illuminate\Http\Response
     */
    public function edit(EstateService $estateService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @param \App\Models\EstateService $estateService
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, EstateService $estateService): RedirectResponse
    {
        $data = $request->validate([
            "service_id"  => "exists:services,id",
            "description" => "string",
        ]);

        $estateService->update($data);

        return back()->with("toast", ["message" => "Service Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\EstateService $estateService
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(EstateService $estateService): RedirectResponse
    {
        $estateService->delete();

        return back()->with(["toast" => ["message" => "Service Deleted!", "type" => "info"]]);
    }
}
