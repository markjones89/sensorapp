<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env('APP_NAME') }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link href="{{ asset('css/bootstrap-grid.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset(mix('css/app.css')) }}" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" async="true"></script>
</head>
<body>
    <input type="hidden" id="sensor_api" value="{{ env('SENSOR_API') }}">
    <div id="app">
        <div class="app-loader">
            <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stop-color="#FF5A09" stop-opacity="0" offset="0%"/>
                        <stop stop-color="#FF5A09" stop-opacity=".631" offset="63.146%"/>
                        <stop stop-color="#FF5A09" offset="100%"/>
                    </linearGradient>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="0.9s"
                                repeatCount="indefinite" />
                        </path>
                        <circle fill="#FF5A09" cx="36" cy="18" r="1">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="0.9s"
                                repeatCount="indefinite" />
                        </circle>
                    </g>
                </g>
            </svg>
        </div>
    </div>

    {{-- <script src="{{ asset(mix('js/vendor.js')) }}"></script> --}}
    <script src="{{ asset(mix('js/app.js')) }}"></script>
</body>
</html>