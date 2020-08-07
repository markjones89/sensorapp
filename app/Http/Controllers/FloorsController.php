<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Floor;
use File;
use Hashids;

class FloorsController extends Controller
{
    public function get(Request $request) {
        // by building
        if ($request->bid) {
            $bid = Hashids::decode($request->bid)[0];
            
            return response(Floor::where('building_id', $bid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(Floor::find($id));
        }

        // all
        return response(Floor::all());
    }

    public function create(Request $request) {
        if ($request->building == '' || !$request->has('building')) {
            return response(['r' => false, 'm' => 'Building is required']);
        } else if ($request->floor_no == '' || !$request->has('floor_no')) {
            return response(['r' => false, 'm' => 'Floor number is required']);
        } else {
            $bid = Hashids::decode($request->building)[0];
            if (Floor::where([
                ['building_id', $bid],
                ['floor_no', $request->floor_no]
            ])->count() > 0) {
                return response(['r' => false, 'm' => 'Floor '.$request->floor_no.' already exist']);
            } else {
                $floor = new Floor;

                $floor->building_id = $bid;
                $floor->floor_no = $request->floor_no;
                $floor->save();

                return response(['r' => true, 'm' => 'Floor added', 'data' => $floor]);
            }
        }
    }

    public function update(Request $request, $id) {
        if ($request->floor_no == '' || !$request->has('floor_no')) {
            return response(['r' => false, 'm' => 'Floor number is required']);
        } else {
            $fid = Hashids::decode($id)[0];
            $floor = Floor::find($fid);

            if (Floor::where([
                    ['building_id', $floor->building_id],
                    ['floor_no', $request->floor_no],
                    ['id', '<>', $fid]
                ])->count() > 0) {
                return response(['r' => false, 'm' => 'Floor '.$request->floor_no.' already exist']);
            } else {
                $floor->floor_no = $request->floor_no;
                $floor->save();

                return response(['r' => true, 'm' => 'Floor updated']);
            }
        }
    }

    /* Floor plan upload */
    public function setFloorPlan(Request $request) {
        $fpFolder = 'floors';
        if ($request->hasFile('floor_plan')) {
            $fid = Hashids::decode($request->id)[0];
            
            try {
                $floor_plan = $request->floor_plan;
                $filename = $floor_plan->hashName();
                $path = $floor_plan->store($fpFolder);
            
                // dd($path, $filename);

                $floor = Floor::find($fid);

                // clean up old floor plan
                if ($floor->floor_plan) {
                    Storage::delete($fpFolder.'/'.$floor->floor_plan);
                }

                $floor->floor_plan = $filename;
                $floor->save();
            } catch(\Exception $e) {
                return response(['r' => true, 'm' => $e->getMessage(), 'err' => $e]);
            }

            return response(['r' => true, 'm' => 'Floor plan uploaded', 'floor_plan' => $filename]);
        }

        return response(['r' => false, 'm' => 'Floor plan image is expected']);
    }

    public function delete($id) {
        $fid = Hashids::decode($id)[0];
        $floor = Floor::find($fid);

        if ($floor) {
            $floor->delete();

            return response(['r' => true, 'm' => 'Floor removed']);
        }

        return response(['r' => false, 'm' => 'Floor doesn\'t exist']);
    }
}
