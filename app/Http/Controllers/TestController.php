<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckTraits;
use Illuminate\Support\Facades\File;
use App\Jobs\AuditJob;
use Illuminate\Support\Facades\Storage;
use Exception;
use Secomapp\ShopifyGraphql\Resources\Product;
use Secomapp\ShopifyGraphql\GraphqlClient;

class TestController extends Controller
{
    use CheckTraits;

    public function fetchTest(Request $request)
    {
        $user = auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;

        $sortedRows = $this->fetchProduct(null);
        $cursor = end($sortedRows)['cursor'];
        $cursor1 = $sortedRows[0]['cursor'];
        $arr = [];
        foreach ($sortedRows as $item) {
            unset($item['cursor']);
            array_push($arr, $item);
        }
        $sortedRows = $arr;
        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        $blogApi = new \Secomapp\Resources\Blog($client);
        $blog = $blogApi->all(['limit' => 1, 'since_id' => 0, 'fields' => 'handle,id']);
        $articleApi = new \Secomapp\Resources\Article($client);
        $article = $articleApi->all($blog[0]->id);
        $collectionApi = new \Secomapp\Resources\CustomCollection($client);
        $collection = $collectionApi->all(['limit' => 1, 'since_id' => 0, 'fields' => 'handle']);

        $blog = $blog[0]->handle ? $blog[0]->handle : '';
        $article = $article[0]->handle ? $article[0]->handle : '';
        $collection = $collection[0]->handle ? $collection[0]->handle : '';
        return response()->json(
            [
                'blogLink' => $blog,
                'articleLink' => $article,
                'collectionLink' => $collection,
                'sortedRows' => $sortedRows,
                'cursor' => $cursor,
                'cursor1' => $cursor1,
            ]
        );
    }

    public function next(Request $request)
    {
        try {
            $cursor = (string)$request->post('cursor');
            $sortedRows = $cursor ? $this->fetchProduct($cursor) : $this->fetchProduct(null);
            $cursor = end($sortedRows)['cursor'];
            $cursor1 = $sortedRows[0]['cursor'];
            $arr = [];
            foreach ($sortedRows as $item) {
                unset($item['cursor']);
                array_push($arr, $item);
            }
            $sortedRows = $arr;
            return response()->json(
                [
                    'sortedRows' => $sortedRows,
                    'cursor' => $cursor,
                    'cursor1' => $cursor1,
                ]
            );
        } catch (Exception $e) {

        }
    }

    public function pre(Request $request)
    {
        try {
            $cursor = (string)$request->post('cursor1');
            $sortedRows = $this->fetchProductBefore($cursor);
            $cursor1 = $sortedRows[0]['cursor'];
            $cursor = end($sortedRows)['cursor'];
            $arr = [];
            foreach ($sortedRows as $item) {
                unset($item['cursor']);
                array_push($arr, $item);
            }
            $sortedRows = $arr;
            return response()->json(
                [
                    'sortedRows' => $sortedRows,
                    'cursor1' => $cursor1,
                    'cursor' => $cursor,
                ]
            );
        } catch (Exception $e) {

        }
    }

    public function fetchProduct($cursor)
    {
        $user = auth()->user();
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;
        $client = new GraphqlClient(null, $shopName, $accessToken);
        $graphShopify = new \Secomapp\ShopifyGraphql\ShopifyGraphql($client);
        $productGraphql = new Product($graphShopify);
        $params = [
            'fields' => ['title', 'handle', 'id', "images (first: 1) {
          edges {
            node {
              src
            }
          }
        }"],
            'first' => 10,
            'after' => $cursor,
        ];
        $products = $productGraphql->all($params);
        $arr = [];
        if (count($products) > 0) {
            foreach ($products as $product) {
                $id = explode('/', $product->node->id)[4];
                $temp = [$id, $product->node->title, $product->node->images->edges[0]->node->src, $product->node->handle, 'cursor' => $product->cursor];
                array_push($arr, $temp);
            }
        }
        return $arr;
    }

    public function fetchProductBefore($cursor)
    {
        $user = auth()->user();
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;
        $client = new GraphqlClient(null, $shopName, $accessToken);
        $graphShopify = new \Secomapp\ShopifyGraphql\ShopifyGraphql($client);
        $productGraphql = new Product($graphShopify);
        $params = [
            'fields' => ['title', 'handle', 'id', "images (first: 1) {
          edges {
            node {
              src
            }
          }
        }"],
            'last' => 10,
            'before' => $cursor,
        ];
        $products = $productGraphql->all($params);
        $arr = [];
        if (count($products) > 0) {
            foreach ($products as $product) {
                $id = explode('/', $product->node->id)[4];
                $temp = [$id, $product->node->title, $product->node->images->edges[0]->node->src, $product->node->handle, 'cursor' => $product->cursor];
                array_push($arr, $temp);
            }
        }
        return $arr;
    }
}
