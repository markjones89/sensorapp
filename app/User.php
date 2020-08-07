<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Company;
use App\Models\Role;
use Hashids;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'id', 'company_id', 'role_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['cid', 'hid'];

    public function getCIdAttribute() {
        $cid = $this->attributes['company_id'];

        if ($cid)
            return Hashids::encode($cid);

        return null;
    }

    public function getHIdAttribute() {
        return Hashids::connection('user')->encode($this->attributes['id']);
    }

    // public function getRIdAttribute() {
    //     return Hashids::encode($this->attributes['role_id']);
    // }

    public function company() {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    // public function roles() {
    //     return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    // }
    public function role() {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    public function isSuperAdmin() {
        // $super = $this->roles()->find(1);
        
        // return $super ? true : false;
        return $this->role->id == 1;
    }

    public function isAdmin() {
        // $admin = $this->roles()->find(2);
        
        // return $admin ? true : false;
        return $this->role->id == 2;
    }
}
