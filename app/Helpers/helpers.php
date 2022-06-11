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

if(!function_exists('user')) {
    function user(): ?User
    {
        return Auth::user();
    }
}

if(!function_exists('convertCurrency')) {
    /**
     * @throws \Exception
     */
    function convertCurrency($value, $from, $to) {
        return Currency::convert()->from($from)->to($to)->amount($value)->round(2)->get();
    }
}
