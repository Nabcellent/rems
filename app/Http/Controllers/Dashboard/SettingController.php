<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use App\Settings\GeneralSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Spatie\LaravelSettings\Settings;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('dashboard/settings', [
            "general" => app(GeneralSettings::class)
        ]);
    }

    public function getUserSettings(): Response|ResponseFactory
    {
        return inertia('dashboard/users/Settings', [
            "user"     => user(),
            "settings" => user()->settings,
        ]);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Setting      $setting
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateSettingRequest $request): RedirectResponse
    {
        $data = $request->validated();

        switch($data["group"]) {
            case "general":
                $setting = app(GeneralSettings::class);

                $setting->site_email = $data["site_email"];
                $setting->site_phone = $data["site_phone"];
                $setting->site_under_maintenance = $data["site_under_maintenance"];

                break;
            default:
                return back()->with("toast", ["message" => "Invalid Setting Group!", "type" => "error"]);
        }

        $setting->save();

        return back()->with("toast", ["message" => str("{$data["group"]} Settings Updated!")->headline()]);
    }

    public function updateUserSettings(Request $request): RedirectResponse
    {
        user()->settings->set($request->all());

        return back()->with("toast", ["message" => "Settings Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
