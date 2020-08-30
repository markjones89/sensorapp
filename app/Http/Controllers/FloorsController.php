<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Floor;
use App\Models\AreaMap;
use App\Models\SensorMap;
use File;
use Hashids;
use Image;

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

    public function getData(Request $request, $id) {
        $fid = Hashids::decode($id)[0];

        // sensors only
        if ($request->so) {
            return response([
                'sensors' => SensorMap::with('area')->where('floor_id', $fid)->get()
            ]);
        }

        return response([
            'areas' => AreaMap::where('floor_id', $fid)->get(),
            'sensors' => SensorMap::with('area')->where('floor_id', $fid)->get()
        ]);
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
                $floor->size_metre = $request->size_metre;
                $floor->size_feet = $request->size_feet;
                $floor->occupancy_limit = $request->occupancy_limit;
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
                $floor->size_metre = $request->size_metre;
                $floor->size_feet = $request->size_feet;
                $floor->occupancy_limit = $request->occupancy_limit;
                $floor->save();

                return response(['r' => true, 'm' => 'Floor updated']);
            }
        }
    }

    /* Floor plan upload */
    public function setFloorPlan(Request $request) {
        if ($request->hasFile('floor_plan')) {
            $fid = Hashids::decode($request->id)[0];

            try {
                $fpFolder = 'floors';
                $fpThumbFolder = $fpFolder.'/thumbnail';

                $floor_plan = $request->floor_plan;
                $filename = $floor_plan->hashName();

                // save file
                $path = $floor_plan->store($fpFolder);

                // save thumbnail
                $thumbWidth = 200;
                $thumbHeight = 135;
                $thumbFolder = storage_path('app/').$fpThumbFolder;
                $thumbPath = $thumbFolder.'/'.$filename;

                if (!is_dir($thumbFolder)) {  mkdir($thumbFolder, 0777, true);  }

                $thumb = Image::make($floor_plan);
                $thumb->resize($thumbWidth, $thumbHeight, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $thumb->save($thumbPath);

                // update floor
                $floor = Floor::find($fid);

                // clean up old floor plan images
                if ($floor->floor_plan) {
                    Storage::delete($fpFolder.'/'.$floor->floor_plan);
                    Storage::delete($fpThumbFolder.'/'.$floor->floor_plan);
                }

                $floor->floor_plan = $filename;
                $floor->save();

                return response(['r' => true, 'm' => 'Floor plan uploaded', 'floor_plan' => $filename]);
            } catch(\Exception $e) {
                return response(['r' => false, 'm' => $e->getMessage(), 'err' => $e]);
            }
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
