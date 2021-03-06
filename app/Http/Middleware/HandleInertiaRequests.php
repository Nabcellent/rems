<?php

namespace App\Http\Middleware;

use App\Enums\ThemeColor;
use App\Models\Amenity;
use App\Models\Estate;
use App\Models\Lease;
use App\Models\Notice;
use App\Models\Payment;
use App\Models\PaymentPlan;
use App\Models\Policy;
use App\Models\Property;
use App\Models\Room;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Models\Unit;
use App\Models\User;
use App\Settings\GeneralSettings;
use App\Settings\UserSettings;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function share(Request $request): array
    {
        $settings = user()?->settings->isEmpty() ? null : user()?->settings;

        return array_merge(parent::share($request), [
            "auth"       => [
                'user' => fn(Request $request) => $request->user() ? $request->user()->only([
                    "id",
                    "first_name",
                    'last_name',
                    'email',
                    "phone",
                    "image",
                    "wallet_balance"
                ]) : null,
            ],
            "can"        => [
                "access" => [
                    "amenities"    => $request->user()?->can("viewAny", Amenity::class),
                    "estates"      => $request->user()?->can("viewAny", Estate::class),
                    "leases"       => $request->user()?->can("viewAny", Lease::class),
                    "notices"      => $request->user()?->can("viewAny", Notice::class),
                    "payments"     => $request->user()?->can("viewAny", Payment::class),
                    "properties"   => $request->user()?->can("viewAny", Property::class),
                    "services"     => $request->user()?->can("viewAny", Service::class),
                    "settings"     => $request->user()?->can("viewAny", Setting::class),
                    "tickets"      => $request->user()?->can("viewAny", Ticket::class),
                    "transactions" => $request->user()?->can("viewAny", Transaction::class),
                    "units"        => $request->user()?->can("viewAny", Unit::class),
                    "users"        => $request->user()?->can("viewAny", User::class),
                ],
                "create" => [
                    "amenity"      => $request->user()?->can("create", Amenity::class),
                    "estate"       => $request->user()?->can("create", Estate::class),
                    "lease"        => $request->user()?->can("create", Lease::class),
                    "payment_plan" => $request->user()?->can("create", PaymentPlan::class),
                    "policy"       => $request->user()?->can("create", Policy::class),
                    "property"     => $request->user()?->can("create", Property::class),
                    "service"      => $request->user()?->can("create", Service::class),
                    "room"         => $request->user()?->can("create", Room::class),
                    "unit"         => $request->user()?->can("create", Unit::class),
                    "user"         => $request->user()?->can("create", User::class),
                ]
            ],
            "greeting"   => Carbon::timelyGreeting(),
            "ziggy"      => fn() => (new Ziggy)->toArray(),
            "toast"      => fn() => session()->get("toast"),
            "csrf_token" => csrf_token(),
            "theme"      => [
                "color"      => [
                    "key"   => match ($settings?->color) {
                        ThemeColor::BLACK->value => ThemeColor::BLACK->color(),
                        ThemeColor::CLOUD_BURST->value => ThemeColor::CLOUD_BURST->color(),
                        ThemeColor::CHROME_YELLOW->value => ThemeColor::CHROME_YELLOW->color(),
                        ThemeColor::DRESS_BLUE->value => ThemeColor::DRESS_BLUE->color(),
                        default => ThemeColor::CRIMSON_RED->color()
                    },
                    "value" => user()?->settings?->color ?? ThemeColor::CRIMSON_RED->value
                ],
                "isDarkMode" => $settings?->dark_mode,
            ]
        ]);
    }
}
