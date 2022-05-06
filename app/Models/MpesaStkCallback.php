<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use DrH\Mpesa\Entities\MpesaStkCallback as DrHMpesaStkCallback;

class MpesaStkCallback extends DrHMpesaStkCallback
{
    use HasFactory;
}
