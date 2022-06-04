<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperEstateService
 */
class EstateService extends Model
{
    use HasFactory;

    protected $fillable = [
        "estate_id",
        "service_id",
        "description",
    ];
}
