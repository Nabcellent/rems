<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class RoomController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Room::class, 'room');
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
    public function store(StoreRoomRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "rm_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/rooms", $data["image"]);
        }

        Room::create($data);

        return back()->with(["toast" => ["message" => str($data['type'])->title() . " Created!"]]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Room $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Room $room
     * @return \Illuminate\Http\Response
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateRoomRequest $request
     * @param \App\Models\Room                     $room
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateRoomRequest $request, Room $room): RedirectResponse
    {
        $data = $request->validated();

//        dd($data);

        if($request->hasFile("image")) {
            $file = $request->file("image");
            $data["image"] = "rm_" . time() . ".{$file->guessClientExtension()}";
            $file->move("images/rooms", $data["image"]);

            if($room->image && file_exists("images/rooms/$room->image")) File::delete("images/rooms/$room->image");
        }

        $room->update($data);

        return back()->with(["toast" => ["message" => "Room Updated!"]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Room $room
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Room $room): RedirectResponse
    {
        $room->delete();

        return back()->with(["toast" => ["message" => "Room Deleted!", "type" => "info"]]);
    }
}
