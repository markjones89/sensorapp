<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class SensorMap extends Model
{
    protected $table = 'sensor_map';
    protected $hidden = ['pivot', 'id', 'floor_id', 'area_id'];
    protected $appends = ['hid', 'fid', 'aid'];

    public function floor() {
        return $this->belongsTo(Floor::class, 'floor_id');
    }

    public function area() {
        return $this->belongsTo(AreaMap::class, 'area_id');
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }

    public function getFIdAttribute() {
        return Hashids::encode($this->attributes['floor_id']);
    }

    public function getAIdAttribute() {
        return Hashids::encode($this->attributes['area_id']);
    }
}
