<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class UserSettings extends Settings
{
    public string $default_password;

    public static function group(): string
    {
        return 'user';
    }
}
