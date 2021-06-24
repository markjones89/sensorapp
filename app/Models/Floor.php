<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Floor extends Model
{
    protected $table = 'floors';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    // public function building() {
    //     return $this->belongsTo(Location::class, 'building_id');
    // }

    public function sensors() {
        return $this->hasMany(SensorMap::class, 'floor_id');
    }

    public function areas() {
        return $this->hasMany(AreaMap::class, 'floor_id');
    }

    // public function getBIdAttribute() {
    //     return Hashids::encode($this->attributes['building_id']);
    // }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }

    // public function getOrdinalNoAttribute() {
    //     $no = $this->attributes['floor_no'];

    //     if ($no == 0) return 'Ground';

    //     $s = ["th", "st", "nd", "rd"];
    //     $v = $no % 100;
    //     $sIdx = ($v - 20) % 10;
    //     $suffix = '';

    //     if ($sIdx >= 0 && $sIdx < 4) $suffix = $s[$sIdx];
    //     else if ($v >= 0 && $v < 4) $suffix = $s[$v];
    //     else $suffix = $s[0];
        
    //     return $no.$suffix;
    // }
}
