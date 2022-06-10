<?php

namespace App\Http\Middleware;

use App\Models\Estate;
use App\Models\Lease;
use App\Models\Notice;
use App\Models\Payment;
use App\Models\Property;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;
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
        return array_merge(parent::share($request), [
            'auth'  => [
                'user' => fn(Request $request) => $request->user() ? $request->user()->only([
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    "phone"
                ]) : null,
            ],
            "can"   => [
                "access" => [
                    "properties"   => $request->user()?->can("viewAny", Property::class),
                    "estates"      => $request->user()?->can("viewAny", Estate::class),
                    "leases"       => $request->user()?->can("viewAny", Lease::class),
                    "units"        => $request->user()?->can("viewAny", Unit::class),
                    "transactions" => $request->user()?->can("viewAny", Transaction::class),
                    "payments"     => $request->user()?->can("viewAny", Payment::class),
                    "notices"      => $request->user()?->can("viewAny", Notice::class),
                    "services"     => $request->user()?->can("viewAny", Service::class),
                    "users"        => $request->user()?->can("viewAny", User::class),
                    "settings"     => $request->user()?->can("viewAny", Setting::class),
                    "tickets"      => $request->user()?->can("viewAny", Ticket::class),
                ],
                "create" => [
                    "user"    => $request->user()?->can("create", User::class),
                    "lease"   => $request->user()?->can("create", Lease::class),
                    "service" => $request->user()?->can("create", Service::class)
                ]
            ],
            'ziggy' => fn() => (new Ziggy)->toArray(),
            'toast' => fn() => session()->get("toast")
        ]);
    }
}
