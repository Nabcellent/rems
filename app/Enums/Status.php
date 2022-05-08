<?php

namespace App\Enums;

enum Status: string
{
    case ACTIVE = "ACTIVE";
    case INACTIVE = "INACTIVE";
    case RESOLVED = "RESOLVED";

    case PENDING = "PENDING";
    case COMPLETED = "COMPLETED";
    case FAILED = "FAILED";
}
