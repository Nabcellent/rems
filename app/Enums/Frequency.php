<?php

namespace App\Enums;

enum Frequency: string
{
    case MONTHLY = "MONTHLY";
    case QUARTERLY = "QUARTERLY";
    case HALF_YEARLY = "HALF_YEARLY";
    case YEARLY = "YEARLY";
}
