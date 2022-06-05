<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_email;
    public int $site_phone;
    public bool $site_under_maintenance;

    public static function group(): string
    {
        return 'general';
    }
}
