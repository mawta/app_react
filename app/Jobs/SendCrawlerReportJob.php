<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Spatie\Crawler\Crawler;
use App\Http\Controllers\API\Crawler\MyObserver;
use Exception;

class SendCrawlerReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;
    protected $shopId;
    //
    public $tries = 10;
    protected $message;
    protected $user;
    protected $channelId;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($url, $shopId, $message, $user, $channelId)
    {
        $this->url = $url;
        $this->shopId = $shopId;
        $this->message = $message;
        $this->user = $user;
        $this->channelId = $channelId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            info("{$this->url}:start job!!!");
            shopSetting($this->shopId, ['crawl_status' => 'processing']);
            Crawler::create()
                ->setCrawlObserver(new MyObserver($this->shopId))
                ->setMaximumDepth(4)
                ->setMaximumResponseSize(1024 * 1024 * 3)
                ->setDelayBetweenRequests(300)
                ->startCrawling($this->url);
            shopSetting($this->shopId, ['crawl_status' => 'done']);
            info("{$this->url}:end job!!!");

        } catch (Exception $e) {
            logger("{$this->url}: scan broken link fail at {$e->getMessage()}, {$e->getTraceAsString()}");
        }


    }
}
