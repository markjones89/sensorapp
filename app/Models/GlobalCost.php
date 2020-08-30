<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class GlobalCost extends Model
{
    protected $table = 'global_costs';
    protected $hidden = ['id'];
    protected $appends = ['hid'];

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
