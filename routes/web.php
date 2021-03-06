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

Route::get('/widgets/{url}', 'AppController@index') //AppController@widget
    ->where(['url' => 'timechart|live'])
    ->name('widget');

Route::get('/report/{url}', 'AppController@index') //AppController@widget
    ->where(['url' => 'utilisation'])
    ->name('report');

Route::get('/profile/authenticated', 'AuthController@getAuthenticatedUser');    // for axios call

Route::middleware(['guest'])->group(function(){
    Route::get('/login', 'AppController@index')->name('login'); //AuthController@login
    Route::post('/authenticate', 'AuthController@authenticate'); // for axios call

    Route::get('/verify', 'VerifyController@index')->name('verify');

    Route::get('/reset', 'AppController@index')->name('reset'); // AuthController@login
    Route::get('/reset/{uid}', 'AppController@index')->name('reset-user'); // AuthController@login
    Route::post('/reset/send-link', 'AuthController@sendResetLink');
});

Route::middleware(['auth'])->group(function(){
    Route::get('/logout', 'AuthController@logout');
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
        Route::get('{bid}/setup', 'AppController@index');
        Route::get('{bid}/mapper', 'AppController@index');
    });

    Route::get('/{url}', 'AppController@index')
        ->where(['url' => 'home|profile|clients|locations|occupancy|users|sync-places|cost-settings|work-settings|time|peak|bar-chart|user-peak|expandable-summary|live|heat-map|comfort-map|wfh|compare'])
        ->name('app');
});