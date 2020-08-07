<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class SensorMap extends Model
{
    protected $table = 'sensor_map';
    protected $hidden = ['pivot', 'id', 'floor_id'];
    protected $appends = ['hid', 'fid'];

    public function floor() {
        return $this->belongsTo(Floor::class, 'floor_id');
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }

    public function getFIdAttribute() {
        return Hashids::encode($this->attributes['floor_id']);
    }
}
