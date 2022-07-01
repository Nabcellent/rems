<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Models\Estate;
use App\Models\Image;
use App\Models\Property;
use App\Models\Room;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
     * Show the form for creating a new resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param string                   $imageable
     * @param int                      $imageableId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOrDeleteMain(Request $request, string $imageable, int $imageableId): JsonResponse
    {
        $model = match ($imageable) {
            "user" => new User,
            "estate" => new Estate,
            "property" => new Property,
            "unit" => new Unit,
        };

        $model = $model->findOrFail($imageableId);

        $dir = str()->plural($imageable);
        $imageName = null;
        $message = "Image Updated!";

        if($request->isMethod("POST")) {
            $file = $request->file("image");
            $imageName = "{$imageable}_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/$dir", $imageName);
        } else {
            $message = "Image Deleted!";
        }

        if($model->image && file_exists("images/$dir/$model->image")) File::delete("images/$dir/$model->image");

        $model->image = $imageName;
        $model->save();

        return response()->json(["message" => $message]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ImageRequest $request): RedirectResponse
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ImageRequest $request, Image $image): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("images")) {
            $dir = str()->plural($data["imageable"]);

            $file = $request->file("images")[0];
            $data["image"] = "{$data['imageable']}_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/$dir", $data["image"]);

            if($image->image && file_exists("images/$dir/$image->image")) File::delete("images/$dir/$image->image");
        }

        $image->update($data);

        return back()->with(["toast" => ["message" => "Image Updated!"]]);
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
