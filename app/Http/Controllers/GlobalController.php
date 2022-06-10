<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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
}
