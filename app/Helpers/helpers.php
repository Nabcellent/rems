<?php

use App\Enums\SettingKey;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Collection;

if(!function_exists('stringifyArr')) {
    function stringifyArr(array|Collection $array): string
    {
        $string = $array instanceof Collection ? $array->implode(',') : implode(', ', $array);

        return str($string)->headline();
    }
}

if(!function_exists('setting')) {
    function setting(SettingKey|array $keys): string
    {
        if(is_array($keys)) {
            return Setting::whereIn('key', $keys)->select(['key', 'value'])->get()
                ->mapWithKeys(fn(Setting $setting) => [$setting->key->name => $setting->value]);
        }

        return Setting::where("key", $keys)->first()->value;
    }
}

if(!function_exists('user')) {
    function user(): ?User
    {
        return Auth::user();
    }
}
