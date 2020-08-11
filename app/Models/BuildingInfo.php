<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class BuildingInfo extends Model
{
    protected $table = 'building_info';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    public function building() {
        return $this->belongsTo(Location::class, 'building_id');
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
