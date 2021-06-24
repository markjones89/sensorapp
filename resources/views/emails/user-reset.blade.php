@component('mail::message')
# Password Reset

Hi {{ $user->name }},

You forgot your password? Don't worry, just click the <strong>Reset Password</strong> button below to reset your password to a new one.

@component('mail::button', ['url' => $url, 'color' => 'success'])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
