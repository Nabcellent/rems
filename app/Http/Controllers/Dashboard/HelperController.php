<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Models\Estate;
use App\Models\Property;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HelperController extends Controller
{
    public function changeOwner(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "user_id"   => "required|exists:users,id",
            "entity"    => "required|string|in:estate,property,unit",
            "entity_id" => "required|integer"
        ]);

        $user = User::find($data["user_id"]);

        $entity = match ($data["entity"]) {
            "estate" => new Estate,
            "property" => new Property,
            "unit" => new Unit
        };

        $entity = $entity->findOrFail($data["entity_id"]);
        $entity->user_id = $user->id;
        $entity->save();

        if(!$user->hasRole(Role::OWNER->value)) $user->assignRole(Role::OWNER->value);

        return back()->with("toast", ["message" => "Owner Changed!"]);
    }
}
