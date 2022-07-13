<?php

namespace App\Enums;

enum Purpose: string
{
    case RENT = "RENT";
    case SALE = "SALE";
    case EITHER = "EITHER";
}
