<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class CustomerCost extends Model
{
    protected $table = 'cust_costs';
    protected $hidden = ['pivot', 'id', 'company_id'];
    protected $appends = ['hid', 'cid'];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function getCIdAttribute() {
        return Hashids::encode($this->attributes['company_id']);
    }

    public function getHIdAttribute() {
        return Hashids::encode($this->attributes['id']);
    }
}
