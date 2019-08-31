<?php

namespace App\Http\Controllers;

use App\Mail\Support;
use Illuminate\Http\Request;
use App\Traits\CheckTraits;
use Illuminate\Support\Facades\Mail;
class HomeController extends Controller
{
    use CheckTraits;
    public function index(Request $request){
        $user = auth()->user();
       $name = $this->shopName();
       $email = $user->email;
       return view('welcome',compact('name','email'));
    }

    public function fetchHome()
    {
        $data = $this->fetch();
        return response()->json($data);
    }

    public function sendMail(Request $request)
    {
        try{
            $subject = (string)$request->post('subject');
            $email = (string)$request->post('email') ?(string)$request->post('email'):auth()->user()->email;
            $message = (string)$request->post('message1');
            $user = auth()->user();
            Mail::to($email)->send(new Support($user,$message,$subject));
        }catch (\Exception $e){
            logger("{$this->shopName()}: send mail fail {$e->getMessage()}, {$e->getTraceAsString()}");

        }
    }

}
