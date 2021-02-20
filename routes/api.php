<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('clients', 'CompaniesController@get');
Route::post('clients', 'CompaniesController@create');
Route::post('clients/logo', 'CompaniesController@setLogo');
Route::put('clients/{id}', 'CompaniesController@update');
Route::delete('clients/{id}', 'CompaniesController@delete');

Route::get('gcosts', 'GlobalCostsController@get');
Route::post('gcosts', 'GlobalCostsController@create');
Route::put('gcosts/{id}', 'GlobalCostsController@update');
Route::delete('gcosts/{id}', 'GlobalCostsController@delete');

Route::get('locations', 'LocationsController@get');
Route::get('locations/{company}/costs', 'LocationsController@getCosts');
Route::post('locations', 'LocationsController@create');
Route::put('locations/{id}', 'LocationsController@update');
Route::delete('locations/{id}', 'LocationsController@delete');

Route::get('floors', 'FloorsController@get');
Route::get('floors/{id}/data', 'FloorsController@getData');
Route::post('floors', 'FloorsController@create');
Route::post('floors/plan', 'FloorsController@setFloorPlan');
Route::put('floors/{id}', 'FloorsController@update');
Route::delete('floors/{id}', 'FloorsController@delete');

Route::get('sensors', 'SensorsController@get');
Route::post('sensors', 'SensorsController@create');
Route::put('sensors/{id}', 'SensorsController@update');
Route::put('sensors/coord/{id}', 'SensorsController@updatePos');
Route::delete('sensors/{id}', 'SensorsController@delete');

Route::get('areas', 'AreasController@get');
Route::get('areas/types', 'AreasController@types');
Route::post('areas', 'AreasController@create');
Route::put('areas/{id}', 'AreasController@update');
Route::put('areas/coord/{id}', 'AreasController@updatePos');
Route::put('areas/trigger-filter/{id}', 'AreasController@updateTriggerFilter');
Route::delete('areas/{id}', 'AreasController@delete');

Route::get('work-configs', 'WorkSettingsController@get');
Route::post('work-configs', 'WorkSettingsController@create');
Route::put('work-configs/{id}', 'WorkSettingsController@update');
Route::delete('work-configs/{id}', 'WorkSettingsController@delete');

Route::get('users', 'UsersController@get');
Route::get('users/{cid}', 'UsersController@getByCompany');
Route::post('users', 'UsersController@create');
Route::post('users/photo/{id}', 'UsersController@setPhoto');
Route::put('users/{id}', 'UsersController@update');
Route::put('users/change-pass/{id}', 'UsersController@updatePass');
Route::put('users/verify/{id}', 'UsersController@verify');
Route::delete('users/{id}', 'UsersController@delete');
Route::get('roles', 'UsersController@roles');