<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\WorkSetting;
use Hashids;
use Image;

class CompaniesController extends Controller
{
    /* API */
    public function get(Request $request) {
        // by ID
        if ($request->id) {
            $cid = Hashids::decode($id)[0];
            
            return response(Company::find($cid));
        } 
        // by ref_id
        else if ($request->rid) {
            return response(Company::where('ref_id', $request->rid)->first());
        }

        return response(Company::all());
    }

    public function create(Request $request) {
        if ($request->ref_id == '' || !$request->has('ref_id')) {
            return response(['r' => false, 'm' => 'Company ID reference is required']);
        } else {
            $comp = new Company;
            $comp->ref_id = $request->ref_id;
            $comp->save();

            // default settings
            /* $ws = new WorkSetting;
            $ws->start_time = '8:00 am';
            $ws->end_time = '5:00 pm';
            $ws->work_days = 'Mon,Tue,Wed,Thu,Fri,Sat,Sun';
            $ws->save(); */

            return response(['r' => true, 'm' => 'Client company added', 'data' => $comp]);
        }
    }

    // public function update(Request $request, $id) {
    //     if ($request->name == '' || !$request->has('name')) {
    //         return response(['r' => false, 'm' => 'Company name is required']);
    //     } else {
    //         $cid = Hashids::decode($id)[0];
    //         $comp = Company::find($cid);

    //         $comp->name = $request->name;
    //         $comp->save();

    //         return response(['r' => true, 'm' => 'Client company updated']);
    //     }
    // }

    public function setLogo(Request $request) {
        if ($request->hasFile('logo')) {
            $cid = Hashids::decode($request->id)[0];

            try {
                $storageFolder = 'public/logos';
                $logoFolder = storage_path('app/').$storageFolder;
                $logo = $request->logo;
                $filename = $logo->hashName();
                $logoPath = $logoFolder.'/'.$filename;

                if (!is_dir($logoFolder)) {  mkdir($logoFolder, 0777, true);  }

                // save logo
                $img = Image::make($logo);

                // resize image if height is bigger than 100px
                if ($img->height() > 100) {
                    $img->resize(null, 100, function ($constraint) {
                        $constraint->aspectRatio();
                    });
                }
                $img->save($logoPath);

                // update company logo field
                $comp = Company::find($cid);

                // clean up old logo
                if ($comp->logo) {
                    Storage::delete($storageFolder.'/'.$comp->logo);
                }

                $comp->logo = $filename;
                $comp->save();

                return response(['r' => true, 'm' => 'Company logo uploaded', 'logo' => $filename]);
            } catch(\Exception $e) {
                return response(['r' => false, 'm' => $e->getMessage(), 'err' => $e]);
            }
        }

        return response(['r' => false, 'm' => 'Logo image is expected']);
    }

    public function delete($id) {
        $cid = Hashids::decode($id)[0];
        $comp = Company::find($cid);

        if ($comp) {
            $comp->delete();

            return response(['r' => true, 'm' => 'Client company removed']);
        }

        return response(['r' => false, 'm' => 'Client company doesn\'t exist']);
    }
}
