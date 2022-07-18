<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'REMS') }}</title>
    <link rel="icon" href="{{ asset("images/logo-dark.svg") }}"/>

    <!-- Styles -->
    <link href="{{ asset("css/bootstrap.min.css") }}" id="bootstrap-style" rel="stylesheet" type="text/css"/>
    <link href="{{ asset("css/dripicons.min.css") }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset("vendor/materialdesign/css/materialdesignicons.min.css") }}"
          referrerpolicy="no-referrer"/>
    <link rel="stylesheet" href="{{ asset("vendor/fontawesome/css/all.min.css") }}" referrerpolicy="no-referrer"/>
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body class="font-sans antialiased">

@inertia

{{--<a href="{{ "/jobdetails/{$job->id}" }}"></a>--}}
</body>
</html>
