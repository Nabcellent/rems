<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

class CreateUserSettings extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->inGroup('user', function(SettingsBlueprint $blueprint): void {
            $blueprint->add('default_password', 12345678);
        });
    }
}
