<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Traits\CheckTraits;
use Carbon\Carbon;
use App\Jobs\SendCrawlerReportJob;
use App\BrokenLink;
use Spatie\Crawler\Crawler;
use App\Http\Controllers\API\Crawler\MyObserver;
use Exception;

class OptimizeController extends Controller
{
    use CheckTraits;

    public function setJsonLd()
    {
        //$shopName = $this->shop();
        $user = auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;

        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        /**
         * @var Asset
         */
        $assetApi = new \Secomapp\Resources\Asset($client);
        $mainTheme = setting('theme_id');
        $orders = $assetApi->get($mainTheme, 'layout/theme.liquid');
        $checkExist = strpos($orders->value, 'SEO-with-JSON-LD-Article-Collection');
        if ($checkExist == false) {
            $position = strpos($orders->value, '<head>');
            $replacement = "\n {% include 'SEO-with-JSON-LD-Article-Collection' %} \n";
            $newThemeValue = substr_replace($orders->value, $replacement, $position + 6, 0);

            $params = (object)[
                'key' => 'layout/theme.liquid',
                'value' => $newThemeValue
            ];
            $assetApi->createOrUpdate($mainTheme, $params);
        }
        $fileContent = File::get(storage_path('app/SEO-with-JSON-LD-Article-Collection.liquid'));
        $contents = (object)[
            'key' => 'snippets/SEO-with-JSON-LD-Article-Collection.liquid',
            'value' => $fileContent
        ];
        $assetApi->createOrUpdate($mainTheme, $contents);
        shopSetting($this->shopId(), ['is_json_ld_installed' => 'yes']);
        return true;
    }

    public function setTitle()
    {
        //$shopName = $this->shop();
        $user = auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;

        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        /**
         * @var Asset
         */
        $assetApi = new \Secomapp\Resources\Asset($client);
        $mainTheme = setting('theme_id');
        $theme = $assetApi->get($mainTheme, 'layout/theme.liquid')->value;
        $start = strpos($theme, '<title>');
        $replacement = "\n <title>" . '{{ page_title }} | {{ shop.name }}' . "{% if template == '404' %}404 Error{% endif %}</title> \n";
        if ($start == false) {
            $position = strpos($theme, '<head>');
            $newThemeValue = substr_replace($theme, $replacement, $position + 6, 0);
            $params = (object)[
                'key' => 'layout/theme.liquid',
                'value' => $newThemeValue
            ];
            $assetApi->createOrUpdate($mainTheme, $params);
            return true;
        }
        $endTitle = strpos($theme, '</title>');
        $length = $endTitle - $start + 8;
        $newThemeValue = substr_replace($theme, $replacement, $start, $length);
        $params = (object)[
            'key' => 'layout/theme.liquid',
            'value' => $newThemeValue
        ];
        $assetApi->createOrUpdate($mainTheme, $params);
        return true;
    }

    public function setDes()
    {
        //$shopName = $this->shop();
        $user = auth()->user();
        $clientSecret = env('SHOPIFY_SHARED_SECRET');
        $shopName = $this->shopName();
        $accessToken = $user->shop->access_token;

        $client = new \Secomapp\ClientApi($clientSecret, $shopName, $accessToken);
        /**
         * @var Asset
         */
        $assetApi = new \Secomapp\Resources\Asset($client);
        $mainTheme = setting('theme_id');
        $theme = $assetApi->get($mainTheme, 'layout/theme.liquid')->value;
        $start = strpos($theme, '<meta name="description" content="');
        $replacement = "\n <meta name='description' content= '{{ page_title }} | {{ shop.name }} {% if template contains 'product' %}{{ product.description | strip_html | strip_newlines | truncatewords: maxwords | escape }}{% endif %}{% if template contains 'page' %}{{ page.content | strip_html | strip_newlines | truncatewords: maxwords | escape }}{% endif %}' /> \n ";
        $position = strpos($theme, '<head>');
        if ($start == false) {
            $newThemeValue = substr_replace($theme, $replacement, $position + 6, 0);
            $params = (object)[
                'key' => 'layout/theme.liquid',
                'value' => $newThemeValue
            ];
            $assetApi->createOrUpdate($mainTheme, $params);
            return true;
        }
        $endDes = strpos($theme, '>', $start);
        $length = $endDes - $start + 1;
        $newThemeValue = substr_replace($theme, '', $start, $length);
        $newThemeValue = substr_replace($newThemeValue, $replacement, $position + 6, 0);
        $params = (object)[
            'key' => 'layout/theme.liquid',
            'value' => $newThemeValue
        ];
        $assetApi->createOrUpdate($mainTheme, $params);
        return true;
    }

    public function setSitemap()
    {
        $shopName = $this->shopName();
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', "http://www.google.com/ping?sitemap=https://${shopName}.myshopify.com/sitemap.xml");
        shopSetting($this->shopId(), ['is_sitemap' => 'yes']);
        return true;
    }

    public function scanBrokenlink()
    {
        try{
            shopSetting($this->shopId(), ['crawl_status' => 'processing']);
            $user = auth()->user();
            $url = $this->shopName() . '.myshopify.com';
            SendCrawlerReportJob::dispatch("https://" . $url, $this->shopId(), 'done', $user, $user->id)->onQueue('BrokenLinks');
        } catch (Exception $e) {
            logger("{$this->shopName()}: scan broken link fail at {$e->getMessage()}, {$e->getTraceAsString()}");
        }

    }
    public function reScanBrokenlink()
    {
        shopSetting($this->shopId(), ['crawl_status' => 'processing']);
        $user = auth()->user();
        $url = $this->shopName() . '.myshopify.com';
        //crawl first time or no broken link in database.
        SendCrawlerReportJob::dispatch("https://" . $url, $this->shopId(), 'done', $user, $user->id)->onQueue('BrokenLinks');
    }



    public function showBrokenlink()
    {
        $isScan = false;
        $isCrawled = false;
        if (shopSetting($this->shopId(), 'crawl_status') == 'processing') {
            $isScan = true;
        }
        if (shopSetting($this->shopId(), 'crawl_status') == 'done') {
            $isCrawled = true;
        }
        $id = $this->shopId();
        $brokenLinks = BrokenLink::where('shop_id',$id )->pluck('broken_link')->all();
        $brokenLinks = $brokenLinks[0] ? $brokenLinks[0] : 0;
        //show broken link.
        return ['isScan' => $isScan, 'brokenLinks' => $brokenLinks, 'isCrawled' => $isCrawled];
    }


    public function fetchOptimize(Request $request)
    {
        $data = $this->fetch();
        $isSitemap = shopSetting($this->shopId(), 'is_sitemap', false);
        $isSitemap = ($isSitemap == 'yes') ? true : false;
        $brokenLink = $this->showBrokenlink();
        $data += ['isSitemap' => $isSitemap] +$brokenLink;
        return response()->json($data);
    }
}
