<?php

namespace App\Http\Controllers\API\Crawler;

use Psr\Http\Message\UriInterface;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;
use Storage;
use App\BrokenLink;

class MyObserver extends BaseReporter
{
    protected $shopId;

    public function __construct($shopId)
    {
        $this->shopId = $shopId;
    }

    /**
     * Called when the crawl has ended.
     * send message to websocket
     */
    public function finishedCrawling()
    {
        //dd($this->host());
        //dd($this->shopId);
        Brokenlink::where('shop_id', $this->shopId)->delete();
        if (! $this->crawledBadUrls()) {
            BrokenLink::create(['shop_id' => $this->shopId, 'broken_link' => null, 'find_on_url' => 'no URL have broken link']);
            return;
        }

        $urlsGroupedByStatusCode = $this->urlsGroupedByStatusCode;
        //dd($urlsGroupedByStatusCode[404]);
        if ($urlsGroupedByStatusCode[404]) {
            foreach ($urlsGroupedByStatusCode[404] as $url) {
                //create data broken link in website
                BrokenLink::updateOrCreate(['shop_id' => $this->shopId, 'find_on_url' => $url->foundOnUrl, 'broken_link' => $url->getScheme().'://'.$url->getHost().''.$url->getPath()]);
            }
        }
    }

    /**
     * Called when the crawler has crawled the given url successfully.
     *
     * @param \Psr\Http\Message\UriInterface      $url
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param \Psr\Http\Message\UriInterface|null $foundOnUrl
     */
    public function crawled(
        UriInterface $url,
        ResponseInterface $response,
        ?UriInterface $foundOnUrl = null
    ) {
        $url->foundOnUrl = $foundOnUrl;

        return parent::crawled($url, $response, $foundOnUrl);
    }

    /**
     * Called when the crawler had a problem crawling the given url.
     *
     * @param \Psr\Http\Message\UriInterface         $url
     * @param \GuzzleHttp\Exception\RequestException $requestException
     * @param \Psr\Http\Message\UriInterface|null    $foundOnUrl
     */
    public function crawlFailed(
        UriInterface $url,
        RequestException $requestException,
        ?UriInterface $foundOnUrl = null
    ) {
        $url->foundOnUrl = $foundOnUrl;

        return parent::crawlFailed($url, $requestException, $foundOnUrl);
    }
}
