<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }} - Account Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <link href="{{ asset(mix('css/app-verify.css')) }}" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="app"></div>
    {{-- <script src="{{ asset(mix('js/vendor.js')) }}"></script> --}}
    <script src="{{ asset(mix('js/app-verify.js')) }}"></script>
</body>
</html>