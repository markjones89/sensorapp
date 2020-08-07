<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Hashids;

class LocationsController extends Controller
{
    /* API */
    public function get(Request $request) {
        // by company
        if ($request->cid) {
            $cid = Hashids::decode($request->cid)[0];
            
            return response(Location::where('company_id', $cid)->get());
        }

        // by id
        if ($request->id) {
            $id = Hashids::decode($request->id)[0];

            return response(Location::find($id));
        }

        // all
        return response(Location::all());
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

            return response(['r' => true, 'm' => 'Location added', 'data' => $loc]);
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
