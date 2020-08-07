<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <link href="{{ asset('css/bootstrap-grid.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset(mix('css/app.css')) }}" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="app">
        Loading...
    </div>

    <script src="{{ asset(mix('js/app.js')) }}"></script>
</body>
</html>