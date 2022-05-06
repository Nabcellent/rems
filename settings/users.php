<?php

use Nabcellent\Laraconfig\Facades\Setting;

Setting::name('email_notifications')->boolean()->default(true);
Setting::name('auto_charge_wallet')->boolean()->default(false);
