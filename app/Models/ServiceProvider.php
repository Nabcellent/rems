<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperServiceProvider
 */
class ServiceProvider extends Pivot
{
    use HasFactory;

    protected $table = "service_providers";
}
