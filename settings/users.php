<?php

use Nabcellent\Laraconfig\Facades\Setting;

Setting::name("notify_email")->boolean()->default(true)->group("account")->bag("notifications");
Setting::name("notify_sms")->boolean()->default(false)->group("account")->bag("notifications");
Setting::name("hide_phone_from_others")->boolean()->default(false)->group("account");

Setting::name("auto_charge_wallet")->boolean()->default(false)->group("billing");

Setting::name("color")->string()->default("#990000")->group("theme");
Setting::name("dark_mode")->boolean()->default(false)->group("theme");

