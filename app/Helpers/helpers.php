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
    function convertCurrency($value, $from, $to)
    {
        return Currency::convert()->from($from)->to($to)->amount($value)->round(2)->get();
    }
}

if(!function_exists('getCountyNames')) {
    function getCountyNames(): array
    {
        return collect(json_decode(file_get_contents(base_path() . "/counties.json"), true))
            ->pluck("name")->sort()->values()->toArray();
    }
}

if(!function_exists('getModelNames')) {
    function getModelNames($path = null): array
    {
        if(!$path) $path = app_path() . "/Models";

        $out = [];
        $results = scandir($path);

        foreach($results as $result) {
            if($result === '.' or $result === '..') continue;

            $filename = $path . '/' . $result;
            $result = "App\\Models\\" . substr($result, 0, -4);

            if(is_dir($filename)) {
                $out = array_merge($out, getModelNames($filename));
            } else {
                $out[] = $result;
            }
        }

        return $out;
    }
}
