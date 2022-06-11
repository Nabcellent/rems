<?php

namespace App\Misc;

use App\Enums\Role;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class IgnoreSuperScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->whereNot('name', Role::SUPER_ADMIN->value);
    }
}
