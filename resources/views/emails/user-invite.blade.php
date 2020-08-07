@component('mail::message')
# Account Invite

Hi {{ $user->name }},

An account has been created under your email <strong>{{ $user->email }}</strong>. Click on the <strong>Accept</strong> button below to verify your account and start using it.

Upon verification, you'll be prompted to enter the security code and your new password.

Use the following security code: <strong>{{ $default_pass }}</strong>

@component('mail::button', ['url' => $url, 'color' => 'success'])
Accept
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
