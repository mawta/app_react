<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckTraits;
use Illuminate\Support\Facades\File;
use App\Jobs\AuditJob;
use Illuminate\Support\Facades\Storage;
use Exception;

class AuditController extends Controller
{
    use CheckTraits;

    public function fetchAudit()
    {
        $shopName = $this->shopName();
        $isAudit = (shopSetting($this->shopId(), 'is_audit', 'no') == 'no') ? false : true;
        $isAuditScan = (shopSetting($this->shopId(), 'is_audit_scan', 'no') == 'no') ? false : true;
        $fileContent=[];
        $fileContent += ['isAudit' => $isAudit, 'isScan' => $isAuditScan];
        if (file_exists(public_path("page/report.{$shopName}.html"))){
            $fileContent +=['page' => "page/report.{$shopName}.html"] ;
        }
        return response()->json($fileContent);
    }

    public function scanAudit()
    {
        try{
            if (!file_exists(public_path("page"))){
                File::makeDirectory(public_path("page"));
            }
            shopSetting($this->shopId(), ['is_audit_scan' => 'yes']);
            $shopName = $this->shopName();
            $id = $this->shopId();
            $lr = env('LIGHTHOUSE');

            AuditJob::dispatch($shopName, $id, $lr)->onQueue('Audit');
        }catch (Exception $e){
            logger("{$this->shopName()}: Audit job fail at {$e->getMessage()}, {$e->getTraceAsString()}");
        }
    }
}
