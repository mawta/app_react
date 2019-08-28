<?php

namespace App\Listeners;


use App\Services\CustomerIO;
use Illuminate\Support\Facades\Log;
use Secomapp\Events\AppUninstalled;
use Secomapp\Facades\ShopSetting;
use Secomapp\Models\ShopInfo;
use Secomapp\Traits\InstalledShop;

class AppUninstalledHandler
{
    use InstalledShop;

    /**
     * Create the event handler.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AppUninstalled $event
     * @return void
     */
    public function handle(AppUninstalled $event)
    {
        $shopId = $event->getShopId();
        if ($event->isIsHook()) {
            $shopInfo = ShopInfo::where('shop_id', $shopId)->first();
            if ($shopInfo) {
                $shopName = shopNameFromDomain($shopInfo->myshopify_domain);
                info("{$shopName}: app uninstalled event");

                $customerIO = new CustomerIO($shopInfo);
                $customerIO->updateCustomer([
                    'io_status' => 'uninstalled',
                    'io_uninstalled_at' => time()
                ]);
            }
        } else {
            info("{$event->getShopId()} app uninstalled event");
        }
    }

}
