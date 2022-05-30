<?php

namespace App\Http\Middleware;

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
                    'email'
                ]) : null,
            ],
            'ziggy' => function() {
                return (new Ziggy)->toArray();
            },
            'toast' => fn() => session()->get("toast")
        ]);
    }
}
