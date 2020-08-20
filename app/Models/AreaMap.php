<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class AreaMap extends Model
{
    protected $table = 'area_map';
    protected $hidden = ['pivot', 'id', 'floor_id', 'points'];
    protected $appends = ['hid', 'fid', 'poly_points'];

    public function floor() {
        return $this->belongsTo(Floor::class, 'floor_id');
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }

    public function getFIdAttribute() {
        return Hashids::encode($this->attributes['floor_id']);
    }

    public function getPolyPointsAttribute() {
        $points_str = $this->attributes['points'];
        $points = [];

        foreach (explode(' ', $points_str) as $point) {
            $x_y = explode(',', $point);

            array_push($points, [
                'x' => (int) $x_y[0],
                'y' => (int) $x_y[1]
            ]);
        }

        return $points;
    }
}
