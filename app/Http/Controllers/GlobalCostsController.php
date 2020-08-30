<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GlobalCost;
use Hashids;

class GlobalCostsController extends Controller
{
    public function get(Request $request) {
        if ($request->country && $request->city) {
            return response(GlobalCost::where([['country', $request->country], ['city', $request->city]])->first());
        }

        return response(GlobalCost::all());
    }

    public function create(Request $request) {
        if (($request->country == '' || !$request->has('country')) || 
            ($request->city == '' || !$request->has('city'))) {
            return response(['r' => false, 'm' => 'Country and city is required']);
        } else if (!$request->has('rental_metre')) {
            return response(['r' => false, 'm' => 'Rental per square metre is required']);
        } else if (!$request->has('rental_foot')) {
            return response(['r' => false, 'm' => 'Rental per foot metre is required']);
        } else if (!$request->has('furniture_cost')) {
            return response(['r' => false, 'm' => 'Furniture cost is required']);
        } else if (GlobalCost::where([
            ['country', $request->country],
            ['city', $request->city]
        ])->count() > 0) {
            return response(['r' => false, 'm' => 'Cost setting for this city already exists']);
        } else {
            $cost = new GlobalCost;

            $cost->country = $request->country;
            $cost->city = $request->city;
            $cost->rental_metre = $request->rental_metre;
            $cost->rental_foot = $request->rental_foot;
            $cost->furniture_cost = $request->furniture_cost;
            $cost->save();

            return response(['r' => true, 'm' => 'Cost settings added', 'data' => $cost]);
        }
    }

    public function update(Request $request, $id) {
        if (($request->country == '' || !$request->has('country')) || 
            ($request->city == '' || !$request->has('city'))) {
            return response(['r' => false, 'm' => 'Country and city is required']);
        } else if (!$request->has('rental_metre')) {
            return response(['r' => false, 'm' => 'Rental per square metre is required']);
        } else if (!$request->has('rental_foot')) {
            return response(['r' => false, 'm' => 'Rental per foot metre is required']);
        } else if (!$request->has('furniture_cost')) {
            return response(['r' => false, 'm' => 'Furniture cost is required']);
        } else {
            $cid = Hashids::decode($id)[0];
            
            if (GlobalCost::where([
                ['country', $request->country],
                ['city', $request->city],
                ['id', '<>', $cid]
            ])->count() > 0) {
                return response(['r' => false, 'm' => 'Cost setting for this city already exists']);
            } else {
                $cost = GlobalCost::find($cid);

                $cost->country = $request->country;
                $cost->city = $request->city;
                $cost->rental_metre = $request->rental_metre;
                $cost->rental_foot = $request->rental_foot;
                $cost->furniture_cost = $request->furniture_cost;
                $cost->save();

                return response(['r' => true, 'm' => 'Cost setting updated', 'data' => $cost]);
            }
        }
    }

    public function delete($id) {
        $cid = Hashids::decode($id)[0];
        $cost = GlobalCost::find($cid);

        if ($cost) {
            $cost->delete();

            return response(['r' => true, 'm' => 'Cost setting removed']);
        }

        return response(['r' => false, 'm' => 'Cost setting doesn\'t exist']);
    }
}
