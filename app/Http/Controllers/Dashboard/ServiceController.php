<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class ServiceController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Service::class, 'service');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/services/index', [
            "services" => Service::select(["id", "name", "description", "icon", "created_at"])->withCount(["providers"])
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
        return inertia("dashboard/services/Upsert", [
            "action" => "create",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreServiceRequest $request): RedirectResponse
    {
        Service::create($request->validated());

        return redirect()->route("dashboard.services.index")->with("toast", [
            "message" => "Service Created!",
            "link"    => ["title" => "View All Services", "href" => route("dashboard.services.index")]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Service $service): Response|ResponseFactory
    {
        return inertia("dashboard/services/Show", [
            "service" => $service->load([
                "providers",
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Service $service): Response|ResponseFactory
    {
        return inertia("dashboard/services/Upsert", [
            "action"  => "update",
            "service" => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Service      $service
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($request->validated());

        return back()->with("toast", ["message" => "Service Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return back()->with(["toast" => ["message" => "Service Deleted!", "type" => "info"]]);
    }
}
