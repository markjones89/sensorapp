<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\WorkSetting;
use Hashids;

class CompaniesController extends Controller
{
    /* API */
    public function get($id = null) {
        if ($id) {
            $cid = Hashids::decode($id)[0];
            
            return response(Company::find($cid));
        }

        return response(Company::all());
    }

    public function create(Request $request) {
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Company name is required']);
        } else {
            $comp = new Company;
            $comp->name = $request->name;
            $comp->save();

            // default settings
            /* $ws = new WorkSetting;
            $ws->start_time = '8:00 am';
            $ws->end_time = '5:00 pm';
            $ws->work_days = 'Mon,Tue,Wed,Thu,Fri,Sat,Sun';
            $ws->save(); */

            return response(['r' => true, 'm' => 'Company added', 'data' => $comp]);
        }
    }

    public function update(Request $request, $id) {
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Company name is required']);
        } else {
            $cid = Hashids::decode($id)[0];
            $comp = Company::find($cid);

            $comp->name = $request->name;
            $comp->save();

            return response(['r' => true, 'm' => 'Company updated']);
        }
    }

    public function delete($id) {
        $cid = Hashids::decode($id)[0];
        $comp = Company::find($cid);

        if ($comp) {
            $comp->delete();

            return response(['r' => true, 'm' => 'Company removed']);
        }

        return response(['r' => false, 'm' => 'Company doesn\'t exist']);
    }
}
