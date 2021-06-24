<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class CustomerCost extends Model
{
    protected $table = 'cust_costs';
    protected $hidden = ['pivot', 'id'];
    protected $appends = ['hid'];

    // public function company() {
    //     return $this->belongsTo(Company::class);
    // }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
