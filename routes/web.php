<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/widgets/{url}', 'AppController@widget')
    ->where(['url' => 'time-chart|live'])
    ->name('widget');

Route::middleware(['guest'])->group(function(){
    Route::get('/login', 'AuthController@login')->name('login');
    Route::post('/login/auth', 'AuthController@authenticate'); // for axios call

    Route::get('/verify', 'VerifyController@index')->name('verify');
    Route::get('/verify/update-pass', 'VerifyController@updatePass');
});

Route::middleware(['auth'])->group(function(){
    Route::get('/logout', 'AuthController@logout');
    Route::get('/profile/authenticated', 'AuthController@getAuthenticatedUser');    // for axios call

    Route::get('/users/init-dependencies', 'UsersController@initDependencies');      // for axios call

    Route::group(['prefix' => 'assets'], function () {
        Route::get('cities', function () {
            // read json
            $json = file_get_contents(public_path('data/cities.json'));
            $data = json_decode($json, true);

            return response($data);
        });

        Route::put('cities', function (Request $request) {
            // $json = json_encode($request->data, JSON_PRETTY_PRINT);
            $json = json_encode($request->data);

            file_put_contents(public_path('data/cities.json'), stripslashes($json));
        });
    });

    Route::get('/', function () { return view('app'); });
    Route::group(['prefix' => 'locations'], function () {
        Route::get('{bid}/floors', 'AppController@location');
        Route::get('{bid}/mapper', 'AppController@location');
    });

    Route::get('/{url}', 'AppController@index')
        ->where(['url' => 'home|profile|clients|locations|occupancy|users|sync-places|work-settings|time|peak|user-peak|cost-analysis|live|heat-map|comfort-map|wfh|compare'])
        ->name('app');
});