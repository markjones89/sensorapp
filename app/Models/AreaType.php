<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class AreaType extends Model
{
    protected $table = 'area_types';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
