<?php

namespace App\Providers;

use App\Listeners\AppInstalledListener;
use App\Listeners\AppUninstalledHandler;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Secomapp\Events\AppInstalled;
use Secomapp\Events\AppUninstalled;

class EventServiceProvider extends ServiceProvider
{

    protected $listen = [
        AppInstalled::class => [
            AppInstalledListener::class,
        ],
        AppUninstalled::class => [
            AppUninstalledHandler::class,
        ],
    ];
    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
