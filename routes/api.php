<?php

use Illuminate\Http\Request;

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
Route::middleware(['auth-shop', 'active-shop'])->group(function() {
    Route::get('/api/get_home', 'HomeController@fetchHome');
    Route::post('/api/send-mail', 'HomeController@sendMail');

    Route::get('/api/get_audit', 'AuditController@fetchAudit');
    Route::get('/api/scan-audit', 'AuditController@scanAudit');

    Route::get('/api/get_test', 'TestController@fetchTest');
    Route::post('/api/next-product', 'TestController@next');
    Route::post('/api/pre-product', 'TestController@pre');

    Route::get('/api/get_optimize', 'OptimizeController@fetchOptimize');
    Route::get('/api/set-json-ld', 'OptimizeController@setJsonLd');
    Route::get('/api/set-title', 'OptimizeController@setTitle');
    Route::get('/api/set-description', 'OptimizeController@setDes');
    Route::get('/api/set-sitemap', 'OptimizeController@setSitemap');
    Route::get('/api/scan-link', 'OptimizeController@scanBrokenlink');
    Route::get('/api/rescan-link', 'OptimizeController@reScanBrokenlink');
});
