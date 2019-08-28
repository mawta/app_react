<?php

namespace App\Providers;

use App\Services\CustomerIO;
use Illuminate\Support\ServiceProvider;
use Secomapp\Models\ShopInfo;

class CustomerIOServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {

    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(CustomerIO::class, function () {
            if (auth()->check()) {
                $shopInfo = ShopInfo::where('shop_id', auth()->user()->shop_id)->first();
                if ($shopInfo) {
                    return new CustomerIO($shopInfo);
                }
            }

            return false;
        });
    }
}
