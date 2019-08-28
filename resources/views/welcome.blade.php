<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Seo Booster</title>
    <link rel="icon" href="{!! asset('images/favicon.ico') !!}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    {{--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>--}}
    {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>--}}
    {{--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>--}}
    <link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">
    <script type="text/javascript">
        window.Laravel = {!! \GuzzleHttp\json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
                'name' => $name,
                'email' => $email,
            ]) !!};
    </script>
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
</html>