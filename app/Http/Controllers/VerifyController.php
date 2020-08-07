<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hashids;

class VerifyController extends Controller
{
    public function index(Request $request) {
        if ($request->uid) {
            $uid = Hashids::connection('user')->decode($request->uid)[0];
            $user = User::find($uid);

            if ($user->email_verified_at) return abort(419);
            return view('verify');
        }
        return abort(400);
    }
}
