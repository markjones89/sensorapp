<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserResetMail;
use App\Models\WorkSetting;
use App\User;
use Hashids;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function authenticate(Request $request) {
        $credentials = $request->only('email', 'password');

        if ($this->isCredentialsEmpty($request)) {
            return response(['r' => false, 'm' => 'Email and password is required']);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response(['r' => false, 'm' => 'User does not exist']);
        }

        if (!$user->email_verified_at) {
            return response(['r' => false, 'm' => 'Account not verified']);
        }

        if (Auth::attempt($credentials)) {
            return response(['r' => true, 'm' => 'Success', 'user' => $this->getAuthUser()]);
        } else {
            return response(['r' => false, 'm' => 'Email and password does not match']);
        }
    }

    private function isCredentialsEmpty($request) { return !$request->filled('email') || !$request->filled('password'); }

    public function login() {
        return view('login');
    }

    public function logout() {
        Auth::logout();
        // return redirect('/login');
    }

    private function getAuthUser() {
        if (!Auth::check()) return response(null);
        $uid = Auth::id();
        $user = User::with(['company.settings', 'role'])->where('id', $uid)->first();

        $user['isSuper'] = $user->isSuperAdmin();
        $user['isAdmin'] = $user->isAdmin();

        $menus = [
            // ['name' => 'profile', 'icon' => 'profile.svg', 'label' => 'Profile']
        ];

        if ($user->isSuperAdmin()) {
            array_push($menus, 
                ['name' => 'users', 'icon' => 'accnt-mgr.svg', 'label' => 'Account Manager'],
                ['name' => 'clients', 'icon' => 'accnt-mgr.svg', 'label' => 'Clients'],
                ['name' => 'cost-settings', 'icon' => 'accnt-mgr.svg', 'label' => 'Cost Settings'],
                ['name' => 'locations', 'icon' => 'accnt-mgr.svg', 'label' => 'Locations']
            );
        }

        if ($user->isAdmin()) {
            array_push($menus,
                ['name' => 'users', 'icon' => 'accnt-mgr.svg', 'label' => 'Account Manager'],
                ['name' => 'locations', 'icon' => 'accnt-mgr.svg', 'label' => 'Locations'],
                ['name' => 'work-settings', 'icon' => 'accnt-mgr.svg', 'label' => 'Work Settings']
            );
        }

        $user['menus'] = $menus;

        return $user;
    }

    public function getAuthenticatedUser() {
        return response($this->getAuthUser());
    }

    public function sendResetLink(Request $request) {
        if ($request->email == '' || !$request->has('email')) {
            return response(['r' => false, 'm' => 'Email address is required']);
        } else {
            $user = User::where('email', $request->email)->first();

            if ($user) {
                Mail::to($user->email)->send(new UserResetMail($user));

                return response(['r' => true, 'm' => 'Password reset link sent to email']);
            }
            
            return response(['r' => false, 'm' => 'User not found']);
        }
    }
}
