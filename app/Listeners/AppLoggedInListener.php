<?php

namespace App\Listeners;

use Illuminate\Support\Facades\DB;
use Secomapp\Events\AppLogined;
use Secomapp\Traits\InstalledShop;

class AppLoggedInListener
{
    use InstalledShop;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AppLogined $event
     *
     * @return void
     */
    public function handle(AppLogined $event)
    {
        $this->shopInfo();

        activity()->causedBy(auth()->user())->withProperties([
            'layer' => 'app',
            'shop'  => $this->shopName(),
        ])->log('A user logs in.');
    }

    protected function shopInfo()
    {
        $shopInfo = DB::table('shop_infos')->where('shop_id', $this->shopId())->first();
        if ($shopInfo) {
            session(['country' => $shopInfo->country_code]);
        }
    }
}
