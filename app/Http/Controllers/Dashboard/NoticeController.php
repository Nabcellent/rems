<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoticeRequest;
use App\Http\Requests\UpdateNoticeRequest;
use App\Models\Notice;
use App\Models\NoticeRecipient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class NoticeController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Notice::class, 'notice');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/notices/index', [
            "notices" => Notice::select(["id", "user_id", "type", "description", "start_at", "end_at"])
                ->with("user:id,first_name,last_name,email")->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia("dashboard/notices/Upsert", [
            "action" => "create",
            "users"  => User::select(["id", "email"])->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreNoticeRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreNoticeRequest $request): RedirectResponse
    {
        Notice::create([...$request->validated(), "user_id" => user()->id])->recipients()
            ->sync($request->validated("recipients"));

        return back()->with("toast", ["message" => "Notice Created!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Notice $notice
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Notice $notice): Response|ResponseFactory
    {
        return inertia("dashboard/notices/Show", [
            "notice" => $notice->load([
                "user:id,first_name,last_name,email,phone",
                "user.roles:id,name",
                "recipients:id,email"
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Notice $notice
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function edit(Notice $notice): Response|ResponseFactory
    {
        return inertia("dashboard/notices/Upsert", [
            "action" => "update",
            "notice" => $notice->load("recipients"),
            "users"  => User::select(["id", "email"])->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Notice       $notice
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateNoticeRequest $request, Notice $notice): RedirectResponse
    {
        $notice->update($request->validated());

        return back()->with("toast", ["message" => "Notice Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Notice $notice
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Notice $notice): RedirectResponse
    {
        $notice->delete();

        return back()->with(["toast" => ["message" => "Notice Deleted!", "type" => "info"]]);
    }
}
