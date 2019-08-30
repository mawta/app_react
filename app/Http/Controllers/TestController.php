<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckTraits;
use Illuminate\Support\Facades\File;
use App\Jobs\AuditJob;
use Illuminate\Support\Facades\Storage;
use Exception;

class TestController extends Controller
{
    use CheckTraits;

    public function fetchTest(Request $request)
    {
        $user= auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken =  $user->shop->access_token;

        $sortedRows = $this->fetchProduct(0,10);
        $id =end($sortedRows)[0];
        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        $blogApi = new \Secomapp\Resources\Blog($client);
        $blog = $blogApi->all(['limit'=>1, 'since_id'=>0, 'fields'=>'handle,id']);
        $articleApi = new \Secomapp\Resources\Article($client);
        $article = $articleApi->all($blog[0]->id);
        $collectionApi = new \Secomapp\Resources\CustomCollection($client);
        $collection = $collectionApi->all(['limit'=>1, 'since_id'=>0, 'fields'=>'handle']);

        $blog = $blog[0]->handle ? $blog[0]->handle : '';
        $article = $article[0]->handle ? $article[0]->handle : '';
        $collection = $collection[0]->handle ? $collection[0]->handle : '';
        return response()->json(
            [
                'blogLink' => $blog,
                'articleLink' => $article,
                'collectionLink' => $collection,
                'sortedRows' => $sortedRows,
                'since_id' => $id,
            ]
        );
    }

    public function next(Request $request){
        $since_id = $request->post('since_id');
        $sortedRows = $since_id ? $this->fetchProduct($since_id,10) :$this->fetchProduct(0,10);
        $id =end($sortedRows)[0];
        return response()->json(
            [
                'sortedRows' => $sortedRows,
                'since_id' => $id,
            ]
        );
    }
    public function pre(Request $request){

    }
    public function fetchProduct($since_id,$limit)
    {
        $user= auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken =  $user->shop->access_token;
        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        $productApi = new \Secomapp\Resources\Product($client);
        $products = $productApi->all(['limit'=>$limit, 'since_id'=>$since_id, 'fields'=>'title,handle,id,image']);
        $arr =[];
        foreach ($products as $product) {
            $temp = [$product->id,$product->title,$product->image->src,$product->handle];
            array_push($arr,$temp);
        }
        return $arr;
    }
}
