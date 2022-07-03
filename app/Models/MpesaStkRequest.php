<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use DrH\Mpesa\Entities\MpesaStkRequest as DrHMpesaStkRequest;

/**
 * @mixin IdeHelperMpesaStkCallback
 */
class MpesaStkRequest extends DrHMpesaStkRequest
{
    use HasFactory;
}
