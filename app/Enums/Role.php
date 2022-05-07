<?php

namespace App\Enums;

enum Role: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case PROPERTY_MANAGER = 'property_manager';
    case OWNER = 'owner';
    case TENANT = 'tenant';
    case SERVICE_PROVIDER = 'service_provider';
}
