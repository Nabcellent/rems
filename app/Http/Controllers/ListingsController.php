<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;
use App\Models\Estate;
use App\Models\Property;
use App\Models\Unit;

class ListingsController extends Controller
{
    public function listings(): Response
    {
        return Inertia::render('Listings', [
            "listings" => Estate::select()
                ->with([
                    "properties",
                    "units"
                ])->latest()->get()
        ]);
    }

    public function show(Estate $estate): Response
    {
        return Inertia::render("SingleListing", [
            'estate' => $estate->load([
                "units:id,user_id,unitable_id,house_number,floor,image,type,description,purpose,status,created_at",
                "properties:id,estate_id,user_id,type,created_at",
                "properties.user:id,first_name,last_name,email,phone",
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "services:id,name,icon,description",
                "policies:id,policeable_id,policeable_type,description",
                "amenities",
                "images:id,imageable_id,imageable_type,image,title,created_at",
            ])->loadCount("units"),
            "googleMapsKey" => config("rems.google.maps.api_key"),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
