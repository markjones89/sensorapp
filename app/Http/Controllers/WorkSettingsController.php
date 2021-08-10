<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkSetting;
use Hashids;

class WorkSettingsController extends Controller
{
    public function get(Request $request) {
        // by company
        if ($request->cid) {
            $cid = Hashids::decode($request->cid)[0];
            $ws = WorkSetting::where('company_id', $cid)->first();
            
            return response(['ws' => $ws]);
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];
            
            return response(['ws' => WorkSetting::find($id)]);
        }

        // all
        // return response(WorkSetting::all());
        return response(['ws' => null]);
    }

    public function create(Request $request) {
        if ($request->company == '' || !$request->has('company')) {
            return response(['r' => false, 'm' => 'Company is required']);
        } else {
            $cid = Hashids::decode($request->company)[0];

            if (WorkSetting::where('company_id', $cid)->count() > 0) {
                return response(['r' => false, 'm' => 'Work settings already exist']);
            }

            $ws = new WorkSetting;

            $ws->company_id = $cid;
            $ws->start_time = $request->start_time;
            $ws->end_time = $request->end_time;
            $ws->work_days = $request->work_days;
            $ws->save();

            return response(['r' => true, 'm' => 'Work settings saved', 'data' => $ws]);
        }
    }

    public function update(Request $request, $id) {
        $ws_id = Hashids::decode($id)[0];
        $ws = WorkSetting::find($ws_id);

        if ($request->has('work_days')) {
            $ws->work_days = $request->work_days;
        }

        if ($request->has('start_time')) {
            $ws->start_time = $request->start_time;
            $ws->end_time = $request->end_time;
        }

        $ws->save();
        
        return response(['r' => true, 'm' => 'Work settings updated', 'data' => $ws]);
    }

    public function delete($id) {
        $ws_id = Hashids::decode($id)[0];
        $ws = WorkSetting::find($ws_id);

        if ($ws) {
            $ws->delete();

            return response(['r' => true, 'm' => 'Work settings removed']);
        }

        return response(['r' => false, 'm' => 'Work settings doesn\'t exist']);
    }
}
