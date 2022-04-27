<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link href="{{ asset("css/boxicons.min.css") }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset("css/bootstrap.min.css") }}" id="bootstrap-style" rel="stylesheet" type="text/css"/>
    <link href="{{ asset("css/dripicons.min.css") }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset("vendor/materialdesign/css/materialdesignicons.min.css") }}" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="{{ asset("vendor/fontawesome/css/all.min.css") }}" referrerpolicy="no-referrer" />

    <!-- Scripts -->
    @routes
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia

@env('local')
    <script src="http://localhost:8080/js/bundle.js"></script>
@endenv
</body>
</html>
