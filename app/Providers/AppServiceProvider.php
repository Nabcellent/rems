<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        Sanctum::ignoreMigrations();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void {
        if(config('app.env') === 'production') URL::forceScheme('https');

        Carbon::macro('timelyGreeting', function () {
            $now = new CarbonImmutable(tz: 'Africa/Nairobi');

            return match (true) {
                $now->isAfter($now->startOfDay()->addHours(18)) => 'Good Evening',
                $now->isAfter($now->startOfDay()->addHours(12)) => 'Good Afternoon',
                default => 'Good Morning',
            };
        });
    }
}
