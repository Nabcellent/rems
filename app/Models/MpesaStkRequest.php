<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use DrH\Mpesa\Entities\MpesaStkRequest as DrHMpesaStkRequest;

/**
 * @mixin IdeHelperMpesaStkRequest
 */
class MpesaStkRequest extends DrHMpesaStkRequest
{
    use HasFactory;
}
