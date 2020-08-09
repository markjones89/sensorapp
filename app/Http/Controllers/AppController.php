<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Location;
use App\Models\Floor;
use Hashids;

class AppController extends Controller
{
    public function index(Request $request, $url) {
        $user = Auth::user();
        
        if ($url == 'clients') {
            if ($user->isSuperAdmin()) return view('app');
            else abort(401);
        } else if (in_array($url, ['locations', 'work-settings'])) {
            if ($user->isAdmin()) return view('app');
            else abort(401);
        }

        return view('app');
    }

    public function location($bid) {
        $bldgId = Hashids::decode($bid);

        if (count($bldgId)) {
            $bldg = Location::find($bldgId[0]);

            if ($bldg) return view('app');
            else abort(404);
        } else abort(404);
    }
}
