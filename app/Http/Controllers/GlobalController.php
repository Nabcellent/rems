<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class GlobalController extends Controller
{
    public function deleteMultiple(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "ids.*" => "required|integer",
            "model" => "required|string"
        ]);

        app("App\\Models\\" . ucfirst($data["model"]))::destroy($data["ids"]);

        $pluralModel = str($data["model"])->pluralStudly();

        return back()->with("toast", ["message" => "$pluralModel Deleted!", "type" => "info"]);
    }

    public function updateStatus(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "entity"    => "required|string",
            "entity_id" => "required|integer",
            "status"    => ["required", new Enum(Status::class)]
        ]);

        $modelName = ucfirst($data["entity"]);

        app("App\\Models\\$modelName")->findOrFail($data["entity_id"])->update($data);

        return back()->with("toast", ["message" => "$modelName Status Updated!"]);
    }
}
