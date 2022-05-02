<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case MPESA = "MPESA";
    case WALLET = "WALLET";
    case CASH = "CASH";
    case PAYPAL = "PAYPAL";
}
