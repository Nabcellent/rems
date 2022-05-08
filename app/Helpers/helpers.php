<?php

use Illuminate\Support\Collection;

if(!function_exists('stringifyArr')) {
    function stringifyArr(array|Collection $array): string
    {
        $string = $array instanceof Collection ? $array->implode(',') : implode(', ', $array);

        return str($string)->headline();
    }
}
