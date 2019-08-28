<?php

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


Route::get('/api/get_home', 'HomeController@fetchHome');
Route::post('/api/send-mail', 'HomeController@sendMail');

Route::get('/api/get_audit', 'AuditController@fetchAudit');
Route::get('/api/scan-audit', 'AuditController@scanAudit');

Route::get('/api/get_test', 'TestController@fetchTest');

Route::get('/api/get_optimize', 'OptimizeController@fetchOptimize');
Route::get('/api/set-json-ld', 'OptimizeController@setJsonLd');
Route::get('/api/set-title', 'OptimizeController@setTitle');
Route::get('/api/set-description', 'OptimizeController@setDes');
Route::get('/api/set-sitemap', 'OptimizeController@setSitemap');
Route::get('/api/scan-link', 'OptimizeController@scanBrokenlink');
Route::get('/api/rescan-link', 'OptimizeController@reScanBrokenlink');







Route::view('/error','error');
Route::get('/audit', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/optimize', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/faq', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/test', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/home', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);

