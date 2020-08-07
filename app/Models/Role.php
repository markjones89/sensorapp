<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Role extends Model
{
    protected $table = 'roles';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    public function users() {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id');
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
