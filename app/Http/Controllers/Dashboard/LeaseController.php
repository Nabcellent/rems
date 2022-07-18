<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Frequency;
use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeaseRequest;
use App\Http\Requests\UpdateLeaseRequest;
use App\Models\Estate;
use App\Models\Lease;
use App\Models\PaymentPlan;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Inertia\ResponseFactory;

class LeaseController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Lease::class, 'lease');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/leases/index', [
            "leases"          => Lease::select([
                "id",
                "user_id",
                "unit_id",
                "expires_at",
                "status",
                "created_at"
            ])->when(!user()->isAdmin(), fn(Builder $qry) => $qry->whereUserId(user()->id)
                ->orWhereHas("unit", function(Builder $qry) {
                    return $qry->whereUserId(user()->id);
                }))->with([
                "unit.user:id,first_name,last_name,username,email",
                "user:id,first_name,last_name,username,email",
                "paymentPlans:id,lease_id,deposit,rent_amount,is_default,frequency",
            ])->latest()->get()->map(fn(Lease $lease) => [
                ...$lease->toArray(),
                "can" => [
                    "edit"    => user()->can("update", $lease),
                    "view"    => user()->can("view", $lease),
                    "destroy" => user()->can("delete", $lease)
                ]
            ]),
            "canUpdateStatus" => user()->can("updateStatus", Lease::class)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(Request $request): Response|ResponseFactory
    {
        return inertia("dashboard/leases/Upsert", [
            "action"  => "create",
            "users"   => User::select(["id", "email", "first_name", "last_name"])->role(Role::TENANT)
                ->oldest("email")->get(),
            "estates" => Estate::select(["id", "name", "service_charge"])
                ->when(!user()->isAdmin(), function(Builder $qry) {
                    return $qry->whereUserId(user()->id)
                        ->orWhereHas("properties", fn(Builder $qry) => $qry->whereUserId(user()->id)
                            ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id)))
                        ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id));
                })->with([
                    "properties:id,estate_id,name",
                    "properties.units:id,unitable_id,house_number",
                    "units:id,unitable_id,house_number"
                ])->get(),
            "unit"    => $request->has("unit") ? Unit::find($request->query("unit")) : null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @throws \Throwable
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreLeaseRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if(Lease::whereUnitId($data["unit_id"])->whereUserId($data["user_id"])->exists()) {
            return back()->with("toast", ["message" => "A lease already exists for this tenant.", "type" => "info"]);
        }

        $lease = DB::transaction(function() use ($data) {
            if(count($data["plans"]) === 1) $data["plans"][0]["is_default"] = true;

            $lease = Lease::create($data);
            $lease->paymentPlans()->createMany($data["plans"]);

            return $lease;
        });

        return redirect()->route("dashboard.leases.index")->with("toast", [
            "message" => "Lease Created!",
            "link"    => [
                "title" => "View Lease",
                "href"  => route("dashboard.leases.show", $lease)
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Lease $lease
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Lease $lease): Response|ResponseFactory
    {
        $lease = $lease->load([
            "unit",
            "unit.user:id,email,phone",
            "unit.transactions:id,transactionable_id,transactionable_type,amount,status,description",
            "user:id,email,phone",
            "user.roles:id,name",
            "paymentPlans:id,lease_id,deposit,rent_amount,frequency,due_day,is_default,created_at",
        ]);

        $data = $lease->toArray();

        if($lease->default_payment_plan) {
            $data["payment_plans"] = [
                [
                    ...$lease->default_payment_plan->toArray(),
                    "can" => [
                        "edit"    => user()->can("update", $lease->default_paymen_plan),
                        "view"    => user()->can("view", $lease->default_paymen_plan),
                        "destroy" => user()->can("delete", $lease->default_paymen_plan)
                    ]
                ]
            ];
        } else {
            $data["payment_plans"] = $lease->paymentPlans->map(fn($plan) => [
                ...$plan->toArray(),
                "can" => [
                    "edit"    => user()->can("update", $plan),
                    "view"    => user()->can("view", $plan),
                    "destroy" => user()->can("delete", $plan)
                ]
            ])->toArray();
        }

        return inertia("dashboard/leases/Show", [
            "lease"           => $data,
            "canUpdateStatus" => user()->can("updateStatus", $lease),
            "canEdit"         => user()->can("update", $lease)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Lease $lease
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Lease $lease): Response|ResponseFactory
    {
        return inertia("dashboard/leases/Upsert", [
            "lease"   => $lease->load([
                "unit:id,user_id,unitable_id,unitable_type,house_number",
                "paymentPlans:id,lease_id,deposit,rent_amount,frequency,is_default,due_day"
            ]),
            "action"  => "update",
            "users"   => User::select(["id", "email"])->get(),
            "estates" => Estate::select(["id", "name", "service_charge"])
                ->when(!user()->isAdmin(), function(Builder $qry) {
                    return $qry->whereUserId(user()->id)
                        ->orWhereHas("properties", fn(Builder $qry) => $qry->whereUserId(user()->id)
                            ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id)))
                        ->orWhereHas("units", fn(Builder $qry) => $qry->whereUserId(user()->id));
                })->with(["properties:id,estate_id,name", "properties.units:id,unitable_id,house_number"])->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Lease        $lease
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateLeaseRequest $request, Lease $lease): RedirectResponse
    {
        $data = $request->validated();

        if(count($data["plans"]) === 1) $data["plans"][0]["is_default"] = true;

        $lease->update($data);

        $lease->paymentPlans()->delete();
        $lease->paymentPlans()->createMany($data["plans"]);

        return back()->with("toast", [
            "message" => "Lease Updated!",
            "link"    => [
                "title" => "View Lease",
                "href"  => route("dashboard.leases.show", ["lease" => $lease])
            ]
        ]);
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
