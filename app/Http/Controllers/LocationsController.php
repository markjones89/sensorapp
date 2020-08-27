<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BuildingInfo;
use App\Models\Location;
use Hashids;

class LocationsController extends Controller
{
    /* API */
    public function get(Request $request) {
        // by company
        if ($request->cid) {
            $cid = Hashids::decode($request->cid)[0];

            // list buildings only
            if ($request->lob) {
                return response(Location::with('building_info')
                    ->where([['company_id', $cid], ['state', '<>', null], ['city', '<>', null]])->get());
            }
            
            return response(Location::with('building_info')->where('company_id', $cid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(Location::with('building_info')->find($id));
        }

        // all
        return response(Location::with('building_info')->all());
    }

    public function create(Request $request) {
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Location name is required']);
        } else if ($request->company == '' || !$request->has('company')) {
            return response(['r' => false, 'm' => 'Company is required']);
        } else {
            $cid = Hashids::decode($request->company)[0];
            $loc = new Location;

            $loc->company_id = $cid;
            $loc->parent_id = $request->has('parent') ? Hashids::decode($request->parent)[0] : null;
            $loc->name = $request->name;
            $loc->continent = $request->continent;
            $loc->country = $request->country;
            $loc->state = $request->state;
            $loc->city = $request->city;
            $loc->save();

            if ($request->has('building_info')) {
                $info = new BuildingInfo;

                $info->building_id = $loc->id;
                $info->rental_metre = $request->building_info['rental_metre'];
                $info->rental_foot = $request->building_info['rental_foot'];
                $info->furniture_cost = $request->building_info['furniture_cost'];
                $info->people_alloc = $request->building_info['people_alloc'];
                $info->save();
            }

            return response(['r' => true, 'm' => 'Location added', 'data' => Location::with('building_info')->find($loc->id)]);
        }
    }

    public function update(Request $request, $id) {
        if ($request->name == '' || !$request->has('name')) {
            return response(['r' => false, 'm' => 'Location name is required']);
        } else {
            $lid = Hashids::decode($id)[0];
            $loc = Location::find($lid);

            $loc->name = $request->name;
            $loc->continent = $request->continent;
            $loc->country = $request->country;
            $loc->state = $request->state;
            $loc->city = $request->city;
            $loc->save();

            if ($request->has('building_info')) {
                $info = BuildingInfo::where('building_id', $lid)->first();

                if (!$info) {
                    $info = new BuildingInfo;

                    $info->building_id = $lid;
                }

                $info->rental_metre = $request->building_info['rental_metre'];
                $info->rental_foot = $request->building_info['rental_foot'];
                $info->furniture_cost = $request->building_info['furniture_cost'];
                $info->people_alloc = $request->building_info['people_alloc'];
                $info->save();
            }

            return response(['r' => true, 'm' => 'Location updated']);
        }
    }

    public function delete($id) {
        $lid = Hashids::decode($id)[0];
        $loc = Location::find($lid);

        if ($loc) {
            $loc->delete();

            return response(['r' => true, 'm' => 'Location removed']);
        }

        return response(['r' => false, 'm' => 'Location doesn\'t exist']);
    }
}
