<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Company extends Model
{
    protected $table = 'companies';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    public function settings() {
        return $this->hasOne(WorkSetting::class);
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
