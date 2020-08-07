<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }} - Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <link href="{{ asset(mix('css/app-login.css')) }}" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="app"></div>
    <script src="{{ asset(mix('js/app-login.js')) }}"></script>
</body>
</html>