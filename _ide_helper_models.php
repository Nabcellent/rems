<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Amenity
 *
 * @property int $id
 * @property string $property_type
 * @property int $property_id
 * @property string $title
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $payable
 * @method static \Database\Factories\AmenityFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity query()
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity wherePropertyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity wherePropertyType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Amenity whereUpdatedAt($value)
 */
	class IdeHelperAmenity {}
}

namespace App\Models{
/**
 * App\Models\Estate
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $address
 * @property float $latitude
 * @property float $longitude
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Amenity[] $amenities
 * @property-read int|null $amenities_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Policy[] $policies
 * @property-read int|null $policies_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Property[] $properties
 * @property-read int|null $properties_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Service[] $services
 * @property-read int|null $services_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Unit[] $units
 * @property-read int|null $units_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\EstateFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estate whereUserId($value)
 */
	class IdeHelperEstate {}
}

namespace App\Models{
/**
 * App\Models\EstateService
 *
 * @property int $id
 * @property int $estate_id
 * @property int $service_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService query()
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService whereEstateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstateService whereUpdatedAt($value)
 */
	class IdeHelperEstateService {}
}

namespace App\Models{
/**
 * App\Models\Image
 *
 * @property int $id
 * @property string $payable_type
 * @property int $payable_id
 * @property string $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $imageable
 * @method static \Database\Factories\ImageFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Image newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image query()
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image wherePayableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image wherePayableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereUpdatedAt($value)
 */
	class IdeHelperImage {}
}

namespace App\Models{
/**
 * App\Models\Lease
 *
 * @property int $id
 * @property int $unit_id
 * @property int $user_id
 * @property int $deposit
 * @property int $rent_amount
 * @property string $start_date
 * @property string $end_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $tenant
 * @property-read \App\Models\Unit $unit
 * @method static \Database\Factories\LeaseFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lease newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lease query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereDeposit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereRentAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereUnitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lease whereUserId($value)
 */
	class IdeHelperLease {}
}

namespace App\Models{
/**
 * App\Models\MpesaStkCallback
 *
 * @property int $id
 * @property string $merchant_request_id
 * @property string $checkout_request_id
 * @property int $result_code
 * @property string $result_desc
 * @property string|null $amount
 * @property string|null $mpesa_receipt_number
 * @property string|null $balance
 * @property string|null $phone
 * @property string|null $transaction_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \DrH\Mpesa\Entities\MpesaStkRequest $request
 * @method static \Database\Factories\MpesaStkCallbackFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback query()
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereCheckoutRequestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereMerchantRequestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereMpesaReceiptNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereResultCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereResultDesc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MpesaStkCallback whereUpdatedAt($value)
 */
	class IdeHelperMpesaStkCallback {}
}

namespace App\Models{
/**
 * App\Models\Notice
 *
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $description
 * @property string|null $start_date
 * @property string|null $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereUserId($value)
 */
	class IdeHelperNotice {}
}

namespace App\Models{
/**
 * App\Models\Payment
 *
 * @property int $id
 * @property int $transaction_id
 * @property string $payable_type
 * @property int $payable_id
 * @property int $amount
 * @property string $method
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $payable
 * @property-read \App\Models\Transaction $transaction
 * @method static \Database\Factories\PaymentFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePayableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePayableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedAt($value)
 */
	class IdeHelperPayment {}
}

namespace App\Models{
/**
 * App\Models\PaypalCallback
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * @method static \Database\Factories\PaypalCallbackFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaypalCallback whereUpdatedAt($value)
 */
	class IdeHelperPaypalCallback {}
}

namespace App\Models{
/**
 * App\Models\Policy
 *
 * @property int $id
 * @property string $property_type
 * @property int $property_id
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $property
 * @method static \Illuminate\Database\Eloquent\Builder|Policy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy query()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy wherePropertyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy wherePropertyType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereUpdatedAt($value)
 */
	class IdeHelperPolicy {}
}

namespace App\Models{
/**
 * App\Models\Property
 *
 * @property int $id
 * @property int $estate_id
 * @property int $user_id
 * @property string $type
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Amenity[] $amenities
 * @property-read int|null $amenities_count
 * @property-read \App\Models\Estate $estate
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Policy[] $policies
 * @property-read int|null $policies_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Unit[] $units
 * @property-read int|null $units_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\PropertyFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Property newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Property newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Property query()
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereEstateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Property whereUserId($value)
 */
	class IdeHelperProperty {}
}

namespace App\Models{
/**
 * App\Models\Room
 *
 * @property int $id
 * @property int $unit_id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Unit $unit
 * @method static \Database\Factories\RoomFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUnitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUpdatedAt($value)
 */
	class IdeHelperRoom {}
}

namespace App\Models{
/**
 * App\Models\Service
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $icon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $estates
 * @property-read int|null $estates_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $providers
 * @property-read int|null $providers_count
 * @method static \Database\Factories\ServiceFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service query()
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUpdatedAt($value)
 */
	class IdeHelperService {}
}

namespace App\Models{
/**
 * App\Models\ServiceProvider
 *
 * @property int $id
 * @property int $user_id
 * @property int $service_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ServiceProviderFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider query()
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServiceProvider whereUserId($value)
 */
	class IdeHelperServiceProvider {}
}

namespace App\Models{
/**
 * App\Models\Setting
 *
 * @property int $id
 * @property \App\Enums\SettingKey $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereValue($value)
 */
	class IdeHelperSetting {}
}

namespace App\Models{
/**
 * App\Models\Ticket
 *
 * @property int $id
 * @property int $user_id
 * @property string $description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\TicketFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUserId($value)
 */
	class IdeHelperTicket {}
}

namespace App\Models{
/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int $user_id
 * @property int $destination_id
 * @property string $type
 * @property int $amount
 * @property \App\Enums\Status $status
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $destination
 * @property-read \App\Models\Payment|null $payment
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\TransactionFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDestinationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUserId($value)
 */
	class IdeHelperTransaction {}
}

namespace App\Models{
/**
 * App\Models\Unit
 *
 * @property int $id
 * @property int $user_id
 * @property string $unitable_type
 * @property int $unitable_id
 * @property string $house_number
 * @property string $purpose For Rent or For Sale
 * @property string|null $description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Amenity[] $amenities
 * @property-read int|null $amenities_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Lease|null $lease
 * @property-read \App\Models\User|null $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Policy[] $policies
 * @property-read int|null $policies_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Room[] $rooms
 * @property-read int|null $rooms_count
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $unitable
 * @method static \Database\Factories\UnitFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit query()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereHouseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereUnitableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereUnitableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereUserId($value)
 */
	class IdeHelperUnit {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property int|null $phone
 * @property string|null $gender
 * @property string|null $image
 * @property string $email
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Estate[] $estates
 * @property-read int|null $estates_count
 * @property-read \App\Models\Lease|null $lease
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Notice[] $notices
 * @property-read int|null $notices_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Property[] $property
 * @property-read int|null $property_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Service[] $services
 * @property-read int|null $services_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @property-read int|null $tickets_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Transaction[] $transactions
 * @property-read int|null $transactions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Unit[] $unit
 * @property-read int|null $unit_count
 * @property-read \App\Models\Wallet|null $wallet
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class IdeHelperUser {}
}

namespace App\Models{
/**
 * App\Models\Wallet
 *
 * @property int $id
 * @property int $user_id
 * @property int $balance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\WalletFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet query()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUserId($value)
 */
	class IdeHelperWallet {}
}

