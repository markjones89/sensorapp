<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class Location extends Model
{
    protected $table = 'locations';
    protected $hidden = ['pivot', 'id', 'parent_id', 'company_id'];
    protected $appends = ['hid', 'pid'];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function building_info() {
        return $this->hasOne(BuildingInfo::class, 'building_id', 'id');
    }

    public function floors() {
        return $this->hasMany(Floor::class, 'building_id');
    }

    public function getCIdAttribute() {
        return Hashids::encode($this->attributes['company_id']);
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }

    public function getPIdAttribute() {
        $pid = $this->attributes['parent_id'];

        if ($pid) return Hashids::encode($this->attributes['parent_id']);
        return null;
    }
}
