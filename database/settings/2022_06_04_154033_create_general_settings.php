<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

class CreateGeneralSettings extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->inGroup('general', function(SettingsBlueprint $blueprint): void {
            $blueprint->add('site_email', "254.rems@gmail.com");
            $blueprint->add('site_phone', 254110039317);
            $blueprint->add('site_under_maintenance', true);
        });
    }
}
