<?php

namespace App\Enums;

enum Status: string
{
    case ACTIVE = "ACTIVE";
    case INACTIVE = "INACTIVE";
    case PENDING = "PENDING";
    case COMPLETED = "COMPLETED";
    case RESOLVED = "RESOLVED";
}
