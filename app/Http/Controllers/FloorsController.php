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
            // $bid = Hashids::decode($request->bid)[0];
            
            return response(Floor::where('building_id', $request->bid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(Floor::find($id));
        }

        // all
        return response(Floor::all());
    }

    // public function getData(Request $request, $id) {
    //     $fid = Hashids::decode($id)[0];

    //     // sensors only
    //     if ($request->so) {
    //         return response([
    //             'sensors' => SensorMap::with('area')->where('floor_id', $fid)->get()
    //         ]);
    //     }

    //     return response([
    //         'areas' => AreaMap::where('floor_id', $fid)->get(),
    //         'sensors' => SensorMap::with('area')->where('floor_id', $fid)->get()
    //     ]);
    // }

    public function create(Request $request) {
        if ($request->building_id == '' || !$request->has('building_id')) {
            return response(['r' => false, 'm' => 'Building reference is required']);
        } else if ($request->ref_id == '' || !$request->has('ref_id')) {
            return response(['r' => false, 'm' => 'Floor reference is required']);
        } else {
            //$bid = Hashids::decode($request->building)[0];
            if (Floor::where([
                ['building_id', $request->building_id],
                ['ref_id', $request->ref_id]
            ])->count() > 0) {
                return response(['r' => false, 'm' => 'Floor already exist']);
            } else {
                $floor = new Floor;

                $floor->building_id = $request->building_id;
                $floor->ref_id = $request->ref_id;
                $floor->occupancy_limit = $request->occupancy_limit;
                $floor->save();

                return response(['r' => true, 'm' => 'Floor added', 'data' => $floor]);
            }
        }
    }

    public function update(Request $request, $id) {
        // $fid = Hashids::decode($id)[0];
        // $floor = Floor::find($fid);
        $floor = Floor::where('ref_id', $id)->first();

        if ($floor) {
            $floor->occupancy_limit = $request->occupancy_limit;
        } else {
            $floor = new Floor;
            $floor->building_id = $request->bid;
            $floor->ref_id = $id;
            $floor->occupancy_limit = $request->occupancy_limit;
        }
        
        $floor->save();

        return response(['r' => true, 'm' => 'Floor updated']);
    }

    /* Floor plan upload */
    public function setFloorPlan(Request $request) {
        if ($request->hasFile('floor_plan')) {
            // $fid = Hashids::decode($request->id)[0];
            $fid = $request->id;

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
                // $floor = Floor::find($fid);
                $floor = Floor::where('ref_id', $fid)->first();

                if ($floor) {
                    // clean up old floor plan images
                    if ($floor->floor_plan) {
                        Storage::delete($fpFolder.'/'.$floor->floor_plan);
                        Storage::delete($fpThumbFolder.'/'.$floor->floor_plan);
                    }

                    $floor->floor_plan = $filename;
                } else {
                    $floor = new Floor;
                    $floor->building_id = $request->bid;
                    $floor->ref_id = $fid;
                    $floor->occupancy_limit = $request->occupancy_limit;
                    $floor->floor_plan = $filename;
                }
                $floor->save();

                return response(['r' => true, 'm' => 'Floor plan uploaded', 'floor_plan' => $filename]);
            } catch(\Exception $e) {
                return response(['r' => false, 'm' => $e->getMessage(), 'err' => $e]);
            }
        }

        return response(['r' => false, 'm' => 'Floor plan image is expected']);
    }

    public function delete($id) {
        // $fid = Hashids::decode($id)[0];
        // $floor = Floor::find($fid);
        $floor = Floor::where('ref_id', $id)->first();

        if ($floor) {
            $floor->delete();

            return response(['r' => true, 'm' => 'Floor removed']);
        }

        return response(['r' => false, 'm' => 'Floor doesn\'t exist']);
    }
}
