<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EstateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EstateServiceController extends Controller
{
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
            "description" => "nullable|string",
        ]);

        EstateService::create($data);

        return back()->with("toast", ["message" => "Service Added!"]);
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
