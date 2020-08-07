<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\User;

class UserInviteMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $default_pass;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $pass)
    {
        $this->user = $user;
        $this->default_pass = $pass;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject(config('app.name').' - Account Invite')
            ->markdown('emails.user-invite')
            ->with([
                'url' => route('verify', ['uid' => $this->user->hid])
            ]);
    }
}
