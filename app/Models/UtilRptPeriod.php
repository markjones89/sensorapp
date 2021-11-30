<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Hashids;

class UtilRptPeriod extends Model
{
    protected $table = 'util_report_periods';
    protected $hidden = ['pivot'];
    // protected $appends = ['hid'];
}
