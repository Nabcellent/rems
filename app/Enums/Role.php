<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case PROPERTY_MANAGER = 'property_manager';
    case OWNER = 'owner';
    case TENANT = 'tenant';
    case SERVICE_PROVIDER = 'service_provider';
}
