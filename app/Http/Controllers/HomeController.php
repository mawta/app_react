<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request){
        return response()->json([
            'name' => 'huy',
            'storeName' => 'storeName',
            'email' => 'Vuduyhuy97@gmail.com',
        ]);
    }
}
