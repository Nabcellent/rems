<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Amenitiable;
use App\Models\Estate;
use App\Models\Unit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AmenitiableController extends Controller
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
            "amenity_id"     => "required|exists:amenities,id",
            "amenitiable"    => "required|string|in:estate,unit",
            "amenitiable_id" => "required|integer",
            "description"    => "nullable|string"
        ]);

        $amenitiable = match ($request->input(["amenitiable"])) {
            "estate" => new Estate,
            "unit" => new Unit,
        };
        $data["amenitiable_type"] = $amenitiable->findOrFail($request->input("amenitiable_id"))->getMorphClass();

        Amenitiable::create($data);

        return back()->with("toast", ["message" => "Amenity Added!"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Amenitiable $amenitiable): RedirectResponse
    {
        $data = $request->validate([
            "amenity_id"  => "exists:services,id",
            "description" => "nullable|string",
        ]);

        $amenitiable->update($data);

        return back()->with("toast", ["message" => "Amenity Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Amenitiable $amenitiable): RedirectResponse
    {
        $amenitiable->delete();

        return back()->with(["toast" => ["message" => "Amenity Deleted!", "type" => "info"]]);
    }
}
