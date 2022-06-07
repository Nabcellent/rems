<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageRequest;
use App\Models\Estate;
use App\Models\Image;
use App\Models\Property;
use App\Models\Room;
use App\Models\Unit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Image::class, 'image');
    }

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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreImageRequest $request): RedirectResponse
    {
        $imageable = match ($request->input(["imageable"])) {
            "estate" => new Estate,
            "property" => new Property,
            "unit" => new Unit,
            "room" => new Room
        };

        $imageable = $imageable->findOrFail($request->input("imageable_id"));

        $images = [];
        foreach($request->file("images") as $index => $file) {
            $imageName = "{$request->input('imageable')}_{$index}_" . time() . ".{$file->guessClientExtension()}";

            $images[] = [
                "imageable_id"   => $request->input("imageable_id"),
                "imageable_type" => $imageable->getMorphClass(),
                "title"          => $request->input("title"),
                "image"          => $imageName,
                "created_at"     => now(),
                "updated_at"     => now(),
            ];

            $file->move("images/" . str()->plural($request->input("imageable")), $imageName);
        }

        $imageable->images()->insert($images);

        return back()->with(["toast" => ["message" => "Image Created!"]]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Image        $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Image $image): RedirectResponse
    {
        $image->delete();

        return back()->with(["toast" => ["message" => "Image Deleted!", "type" => "info"]]);
    }
}
