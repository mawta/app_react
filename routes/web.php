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

Route::view('/error','error');
Route::get('/audit', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/optimize', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/docs', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/test', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/home', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);
Route::get('/', 'HomeController@index')->middleware(['auth-shop', 'active-shop']);


