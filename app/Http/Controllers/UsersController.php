<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\UserInviteMail;
use App\Models\Company;
use App\Models\Role;
use App\User;
use Hashids;
use Image;

class UsersController extends Controller
{
    /* Users API */
    public function get(Request $request, $id = null) {
        if ($id) {
            $uid = Hashids::connection('user')->decode($id)[0];
            
            return response(User::with(['company', 'role'])->find($uid));
        }

        // get by company (request payload)
        if ($request->cid) {
            return response(User::with(['company', 'role'])->where('company_id', $request->cid)->get());
        }

        return response(User::with(['company', 'role'])->get());
    }

    // public function getByCompany($cid) {
    //     // $compId = Hashids::decode($cid)[0];

    //     return response(User::with('role')->where('company_id', $cid)->get());
    // }

    /**
     * Generates a unique username using an email address
     */
    public function usernameFromEmail($email) {
        return rtrim(strtr(base64_encode($email), '+/', '-_'), '=');
    }

    /**
     * Returns the email address used to generate the unique username
     */
    public function usernameToEmail($username) {
        return base64_decode(str_pad(strtr($username, '-_', '+/'), strlen($username) % 4, '=', STR_PAD_RIGHT));
    }
    
    public function create(Request $request) {
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Name is required']);
        } else if ($request->email == '' || !$request->has('email')) {
            return response(['r' => false, 'm' => 'Email is required']);
        } else {
            $u = new User;

            //$cid = $request->company;
            $randPass = Str::random(16);
            $hashedPass = Hash::make($randPass);

            // $u->company_id = $cid ? Hashids::decode($cid)[0] : null;
            $u->company_id = $request->company;
            $u->name = $request->name;
            $u->email = $request->email;
            $u->password = $hashedPass;
            $u->role_id = Hashids::decode($request->role)[0];

            $u->save();

            //TODO: Send invitation email (for verification and setting of password)
            Mail::to($u->email)->send(new UserInviteMail($u, $randPass));

            return response([
                'r' => true, 
                'm' => 'Account invitation sent', 
                'data' => User::with(['company', 'role'])->find($u->id)]);
        }
    }

    public function update(Request $request, $id) {
        $uid = Hashids::connection('user')->decode($id)[0];
        $user = User::find($uid);

        if ($user) {
            $res = false;
            $message = '';

            if ($request->has('name')) {
                if ($request->name == '') {
                    $message = 'Name is required';
                } else {
                    $user->name = $request->name;
                    $res = true;
                    $message = 'Name updated';
                }
            }

            if ($res) $user->save();

            return response(['r' => $res, 'm' => $message]);
        }

        return response(['r' => false, 'm' => 'User not found']);
    }

    public function updatePass(Request $request, $id) {
        if ($request->password == '' || !$request->has('password')) {
            return response(['r' => false, 'm' => 'Password is required']);
        } else {
            $uid = Hashids::connection('user')->decode($id)[0];
            $user = User::find($uid);

            if ($user) {
                $user->password = Hash::make($request->password);
                $user->save();

                return response(['r' => true, 'm' => 'Password changed']);
            }
            return response(['r' => false, 'm' => 'User not found']);
        }
    }

    public function setPhoto(Request $request, $id) {
        if ($request->hasFile('photo')) {
            $uid = Hashids::connection('user')->decode($id)[0];

            try {
                $folder = 'public/user-photos';
                $thumb = $folder.'/thumbnail';
                $photoFolder = storage_path('app/').$folder;
                $thumbFolder = storage_path('app/').$thumb;
                $photo = $request->photo;
                $filename = $photo->hashName();
                $photoPath = $photoFolder.'/'.$filename;
                $thumbPath = $thumbFolder.'/'.$filename;

                if (!is_dir($photoFolder)) {  mkdir($photoFolder, 0777, true);  }
                if (!is_dir($thumbFolder)) {  mkdir($thumbFolder, 0777, true);  }

                // save photo
                $img = Image::make($photo);

                // resize image if height is bigger than 100px
                $photoHeight = 250;
                if ($img->height() > $photoHeight) {
                    $img->resize(null, $photoHeight, function ($constraint) {
                        $constraint->aspectRatio();
                    });
                }
                $img->save($photoPath);
                // photo thumbnail
                $thumbSize = 40;
                $img->resize(null, $thumbSize, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save($thumbPath);

                // update user profile photo
                $user = User::find($uid);

                // clean up old photo
                if ($user->photo) {
                    Storage::delete($folder.'/'.$user->photo);
                    Storage::delete($thumb.'/'.$user->photo);
                }

                $user->photo = $filename;
                $user->save();

                return response(['r' => true, 'm' => 'User photo uploaded', 'photo' => $filename]);
            } catch(\Exception $e) {
                return response(['r' => false, 'm' => $e->getMessage(), 'err' => $e]);
            }
        }

        return response(['r' => false, 'm' => 'Logo image is expected']);
    }

    public function verify(Request $request, $id) {
        $uid = Hashids::connection('user')->decode($id)[0];
        $user = User::find($uid);

        if ($user) {
            if ($request->password == '' || !$request->has('password')) {
                return response(['r' => false, 'm' => 'Password is required']);
            } else if ($request->security_code == '' || !$request->has('security_code')) {
                return response(['r' => false, 'm' => 'Security code is required']);
            } else {
                if (Hash::check($request->security_code, $user->password)) {
                    $user->password = Hash::make($request->password);
                    $user->email_verified_at = now();
                    $user->save();

                    return response(['r' => true, 'm' => 'Account verified']);
                }
                return response(['r' => false, 'm' => 'Invalid security code provided']);
            }
        }
        return response(['r' => false, 'm' => 'User not found']);
    }

    public function delete($id) {
        $uid = Hashids::decode($id)[0];
        $user = User::find($uid);

        if ($user) {
            $user->delete();

            return response(['r' => true, 'm' => 'User removed']);
        }

        return response(['r' => false, 'm' => 'User doesn\'t exist']);
    }

    /* Roles API */
    public function roles($id = null) {
        if ($id) {
            $rid = Hashids::decode($id)[0];
            
            return response(Role::find($rid));
        }

        return response(Role::all());
    }

    /* Non-API axios call routes */
    public function initDependencies() {
        $user = Auth::user();
        $roles = Role::all();

        foreach ($roles as $role) {
            $role['byCompany'] = $role->id != 1;
        }

        if ($user->isSuperAdmin()) {
            $res['clients'] = Company::all();
            $res['roles'] = $roles;
        } else {
            $res['roles'] = $roles->except(1);
        }

        return response($res);
    }
}
