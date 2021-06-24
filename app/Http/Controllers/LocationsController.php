<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BuildingInfo;
// use App\Models\Location;
use App\Models\CustomerCost;
use App\Models\GlobalCost;
use Hashids;

class LocationsController extends Controller
{
    // public function get(Request $request) {
    //     // by company
    //     if ($request->cid) {
    //         $cid = Hashids::decode($request->cid)[0];

    //         // list buildings only
    //         if ($request->lob) {
    //             return response(Location::with('building_info')
    //                 ->where([['company_id', $cid], ['state', '<>', null], ['city', '<>', null]])->get());
    //         }
            
    //         return response(Location::with('building_info')->where('company_id', $cid)->get());
    //     }

    //     // by id
    //     if ($request->id) {
    //         $id = Hashids::decode($request->id)[0];

    //         return response(Location::with('building_info')->find($id));
    //     }

    //     // all
    //     return response(Location::with('building_info')->all());
    // }

    public function getCosts($company) {
        // $cid = Hashids::decode($company)[0];

        return response([
            'global_costs' => GlobalCost::all(),
            'cust_costs' => CustomerCost::where('company_id', $company)->get()
        ]);
    }

    // public function create(Request $request) {
    //     if ($request->name == '' || !$request->has('name')) {
    //         return response(['r' => false, 'm' => 'Location name is required']);
    //     } else if ($request->company == '' || !$request->has('company')) {
    //         return response(['r' => false, 'm' => 'Company is required']);
    //     } else {
    //         $cid = Hashids::decode($request->company)[0];
    //         $loc = new Location;
    //         $cost_saved_to_cust = false;

    //         $loc->company_id = $cid;
    //         $loc->parent_id = $request->has('parent') ? Hashids::decode($request->parent)[0] : null;
    //         $loc->name = $request->name;
    //         $loc->continent = $request->continent;
    //         $loc->country = $request->country;
    //         $loc->state = $request->state;
    //         $loc->city = $request->city;
    //         $loc->save();

    //         if ($request->has('building_info')) {
    //             $info = new BuildingInfo;

    //             $info->building_id = $loc->id;
    //             $info->rental_metre = $request->building_info['rental_metre'];
    //             $info->rental_foot = $request->building_info['rental_foot'];
    //             $info->furniture_cost = $request->building_info['furniture_cost'];
    //             $info->people_alloc = $request->building_info['people_alloc'];
    //             $info->save();

    //             // save cust cost setting
    //             $cost_saved_to_cust = $this->saveCustCostSettings($cid, $request->country, $request->city, $info->rental_metre, $info->rental_foot, $info->furniture_cost);
    //         }

    //         return response(['r' => true, 'm' => 'Location added', 'data' => Location::with('building_info')->find($loc->id), 'saved_to_cust' => $cost_saved_to_cust]);
    //     }
    // }

    // public function update(Request $request, $id) {
    //     if ($request->name == '' || !$request->has('name')) {
    //         return response(['r' => false, 'm' => 'Location name is required']);
    //     } else {
    //         $lid = Hashids::decode($id)[0];
    //         $loc = Location::find($lid);
    //         $cost_saved_to_cust = false;

    //         $loc->name = $request->name;
    //         $loc->continent = $request->continent;
    //         $loc->country = $request->country;
    //         $loc->state = $request->state;
    //         $loc->city = $request->city;
    //         $loc->save();

    //         if ($request->has('building_info')) {
    //             $info = BuildingInfo::where('building_id', $lid)->first();

    //             if (!$info) {
    //                 $info = new BuildingInfo;

    //                 $info->building_id = $lid;
    //             }

    //             $info->rental_metre = $request->building_info['rental_metre'];
    //             $info->rental_foot = $request->building_info['rental_foot'];
    //             $info->furniture_cost = $request->building_info['furniture_cost'];
    //             $info->people_alloc = $request->building_info['people_alloc'];
    //             $info->save();

    //             // save cust cost setting
    //             $cost_saved_to_cust = $this->saveCustCostSettings($loc->company_id, $request->country, $request->city, $info->rental_metre, $info->rental_foot, $info->furniture_cost);
    //         }

    //         return response(['r' => true, 'm' => 'Location updated', 'saved_to_cust' => $cost_saved_to_cust]);
    //     }
    // }

    public function saveCosts(Request $request, $company_id) {
        // $company_id = Hashids::decode($company)[0];
        $country = $request->country;
        $city = $request->city;
        $rental_metre = $request->rental_sqm;
        $rental_foot = $request->rental_sqft;
        $furniture_cost = $request->furniture_cost;
        $cost = CustomerCost::where([['company_id', $company_id], ['country', $country], ['city', $city]])->first();
        $gcost = GlobalCost::where([['country', $country], ['city', $city]])->first();

        if ($cost) {
            $cost->rental_metre = $rental_metre;
            $cost->rental_foot = $rental_foot;
            $cost->furniture_cost = $furniture_cost;
            $cost->save();

            return response(['r' => true]);
        } else if (($gcost && ($gcost->rental_metre != $rental_metre || $gcost->rental_foot != $rental_foot || $gcost->furniture_cost != $furniture_cost)) || !$gcost) {
            $cost = new CustomerCost;

            $cost->company_id = $company_id;
            $cost->country = $country;
            $cost->city = $city;
            $cost->rental_metre = $rental_metre;
            $cost->rental_foot = $rental_foot;
            $cost->furniture_cost = $furniture_cost;
            $cost->save();

            return response(['r' => true]);
        }

        return response(['r' => false]);
    }

    // public function delete($id) {
    //     $lid = Hashids::decode($id)[0];
    //     $loc = Location::find($lid);

    //     if ($loc) {
    //         $loc->delete();

    //         return response(['r' => true, 'm' => 'Location removed']);
    //     }

    //     return response(['r' => false, 'm' => 'Location doesn\'t exist']);
    // }
}
