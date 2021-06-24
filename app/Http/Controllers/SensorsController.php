<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SensorMap;
use Hashids;

class SensorsController extends Controller
{
    public function get(Request $request) {
        // by floor
        if ($request->fid) {
            // $fid = Hashids::decode($request->fid)[0];
            
            return response(SensorMap::where('floor_id', $request->fid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(SensorMap::find($id));
        }

        return response(SensorMap::all());
    }

    public function create(Request $request) {
        if ($request->floor_id == '' || !$request->has('floor_id')) {
            return response(['r' => false, 'm' => 'Floor is required']);
        } else if ($request->ref_id == '' || !$request->has('ref_id')) {
            return response(['r' => false, 'm' => 'Sensor ID is required']);
        } else {
            // $fid = Hashids::decode($request->floor)[0];
            if (SensorMap::where([
                ['floor_id', $request->floor_id],
                ['ref_id', $request->ref_id]
            ])->count() > 0) {
                return response(['r' => false, 'm' => 'Sensor '.$request->ref_id.' already exist']);
            } else {
                $map = new SensorMap;

                $map->ref_id = $request->ref_id;
                $map->floor_id = $request->floor_id;
                $map->pos_x = $request->pos_x;
                $map->pos_y = $request->pos_y;
                $map->scale = $request->scale;
                $map->save();

                return response(['r' => true, 'm' => 'Sensor added', 'data' => $map]);
            }
        }
    }

    // public function update(Request $request, $id) {
    //     $mid = Hashids::decode($id)[0];
    //     if ($request->sensor_id == '' || !$request->has('sensor_id')) {
    //         return response(['r' => false, 'm' => 'Sensor ID is required']);
    //     } else {
    //         $map = SensorMap::find($mid);

    //         $map->sensor_id = $request->sensor_id;
    //         $map->name = $request->name;
    //         $map->group_id = $request->group;
    //         $map->area_id = $request->area ? Hashids::decode($request->area)[0] : null;
    //         $map->save();

    //         return response(['r' => true, 'm' => 'Sensor updated']);
    //     }
    // }

    public function updatePos(Request $request, $id) {
        $mid = Hashids::decode($id)[0];
        if (!$request->has('pos_x') || !$request->has('pos_y') || !$request->has('scale')) {
            return response(['r' => false, 'm' => 'Sensor position is required']);
        } else {
            $map = SensorMap::find($mid);

            $map->pos_x = $request->pos_x;
            $map->pos_y = $request->pos_y;
            $map->scale = $request->scale;
            $map->save();

            return response(['r' => true, 'm' => 'Sensor position updated']);
        }
    }

    public function delete($id) {
        // $mid = Hashids::decode($id)[0];
        // $map = SensorMap::find($mid);
        $map = SensorMap::where('ref_id', $id)->first();

        if ($map) {
            $map->delete();

            return response(['r' => true, 'm' => 'Sensor removed']);
        }

        return response(['r' => false, 'm' => 'Sensor doesn\'t exist']);
    }
}
