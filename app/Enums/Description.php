<?php

namespace App\Enums;

enum Description: string
{
    case RENT_PAYMENT = "Rent Payment";
    case RENT_DEPOSIT = "Rent Deposit";
    case PROPERTY_PURCHASE = "Property Purchase";
    case UNIT_PURCHASE = "Unit Purchase";
    case WALLET_DEPOSIT = "Wallet Deposit";
}
