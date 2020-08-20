<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AreaMap;
use Hashids;

class AreasController extends Controller
{
    public function get(Request $request) {
        // by floor
        if ($request->fid) {
            $fid = Hashids::decode($request->fid)[0];
            
            return response(AreaMap::where('floor_id', $fid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(AreaMap::find($id));
        }

        return response(AreaMap::all());
    }

    public function create(Request $request) {
        if ($request->floor == '' || !$request->has('floor')) {
            return response(['r' => false, 'm' => 'Floor is required']);
        } else if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Area ID is required']);
        } else {
            $fid = Hashids::decode($request->floor)[0];
            if (AreaMap::where([
                ['floor_id', $fid],
                ['name', $request->name]
            ])->count() > 0) {
                return response(['r' => false, 'm' => 'Area '.$request->sensor_id.' already exist']);
            } else {
                $map = new AreaMap;

                $map->floor_id = $fid;
                $map->name = $request->name;
                $map->points = $request->points;
                $map->scale = $request->scale;
                $map->save();

                return response(['r' => true, 'm' => 'Area added', 'data' => $map]);
            }
        }
    }

    public function update(Request $request, $id) {
        $mid = Hashids::decode($id)[0];
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Area name is required']);
        } else {
            $map = AreaMap::find($mid);

            $map->name = $request->name;
            $map->save();

            return response(['r' => true, 'm' => 'Area name updated']);
        }
    }

    public function updatePos(Request $request, $id) {
        $mid = Hashids::decode($id)[0];
        if (!$request->has('points') || !$request->has('scale')) {
            return response(['r' => false, 'm' => 'Area position is required']);
        } else {
            $map = AreaMap::find($mid);

            $map->points = $request->points;
            $map->scale = $request->scale;
            $map->save();

            return response(['r' => true, 'm' => 'Area position updated']);
        }
    }

    public function delete($id) {
        $mid = Hashids::decode($id)[0];
        $map = AreaMap::find($mid);

        if ($map) {
            $map->delete();

            return response(['r' => true, 'm' => 'Area removed']);
        }

        return response(['r' => false, 'm' => 'Area doesn\'t exist']);
    }
}
