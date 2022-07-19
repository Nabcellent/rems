<?php

namespace App\Http\Controllers;

use App\Enums\RoomType;
use App\Models\Amenity;
use App\Models\Estate;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class ListingsController extends Controller
{
    public function listings(): Response
    {
        return Inertia::render('Listings', [
            "listings" => Unit::select([
                "id",
                "unitable_id",
                "unitable_type",
                "purpose",
                "price",
                "rent_amount",
                "type",
                "created_at",
                "image"
            ])->with(["unitable", "amenities:id,title,icon"])->withCount(["rooms as bedroom_count" => function(Builder $qry) {
                return $qry->whereType(RoomType::BEDROOM);
            }])->active()->latest()->get(),
            "amenities" => Amenity::select(["id", "title"])->get(),
            "counties" => getCountyNames(),
            "priceRanges" => Unit::selectRaw("MAX(rent_amount) as max_rent_amount, MIN(rent_amount) as min_rent_amount, MAX(price) as max_price, MIN(price) as min_price")->first()
        ]);
    }

    public function show(Estate $estate): Response
    {
        return Inertia::render("SingleListing", [
            'estate'         => $estate->load([
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
            "googleMapsKey"  => config("rems.google.maps.api_key"),
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
        ]);
    }
}
