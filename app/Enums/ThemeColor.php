<?php

namespace App\Enums;

enum ThemeColor: string
{
    case BLACK = "#000";
    case CHROME_YELLOW = "#FFA700";
    case CLOUD_BURST = "#202E54";
    case CRIMSON_RED = "#990000";
    case DRESS_BLUE = "#157DEC";

    public function color(): string
    {
        return str(strtolower($this->name))->headline()->kebab();
    }
}
