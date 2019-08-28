<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Exception;
use Symfony\Component\Process\Process;

class AuditJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    protected $shopName;
    protected $shopId;
    protected $lighthouse;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($shopName, $shopId, $lighthouse)
    {
        $this->shopName = $shopName;
        $this->shopId = $shopId;
        $this->lighthouse = $lighthouse;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $output = public_path("page").DIRECTORY_SEPARATOR."report.{$this->shopName}.html";
            $url = 'https://' . $this->shopName . '.myshopify.com';
            $cmd = shell_exec($this->lighthouse." {$url} --chrome-flags='--headless --disable-gpu' --output=html --output-path={$output} 2>&1");
            shopSetting($this->shopId, ['is_audit' => 'yes', 'is_audit_scan' => 'no']);
        } catch (Exception $e) {
            logger("{$this->shopName}: Audit job fail at {$e->getMessage()}, {$e->getTraceAsString()}");
        }
    }
}
