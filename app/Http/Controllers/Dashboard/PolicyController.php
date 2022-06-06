<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePolicyRequest;
use App\Http\Requests\UpdatePolicyRequest;
use App\Models\Estate;
use App\Models\Policy;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PolicyController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePolicyRequest $request): RedirectResponse
    {
        $policeable = match ($request->input(["policeable"])) {
            "estate" => new Estate,
            "property" => new Property,
            "unit" => new Unit,
        };

        $policeable = $policeable->findOrFail($request->input("policeable_id"));
        $policeable->policies()->create($request->validated());

        return back()->with("toast", ["message" => "Policy Created!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function show(Policy $policy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function edit(Policy $policy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Policy  $policy
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdatePolicyRequest $request, Policy $policy): RedirectResponse
    {
        $policy->update($request->validated());

        return back()->with("toast", ["message" => "Policy Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Policy  $policy
     * @return \Illuminate\Http\Response
     */
    public function destroy(Policy $policy)
    {
        //
    }
}
