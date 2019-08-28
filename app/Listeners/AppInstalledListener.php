<?php

namespace App\Listeners;

use App\Services\CustomerIO;
use App\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use LaravelFeature\Facade\Feature;
use Secomapp\Events\AppInstalled;
use Secomapp\Traits\InstalledShop;

class AppInstalledListener
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
     * @param  AppInstalled $event
     * @return void
     */
    public function handle(AppInstalled $event)
    {
        info('app installed event');
        if ($this->shop()->uninstalled_at != null){
            $this->shop()->update([
                'uninstalled_at' => null
            ]);
        }

        $this->checkFeature();

        app(CustomerIO::class)->updateCustomer([
            'io_status' => 'installed',
            'io_installed_at' => time(),
            'io_uninstalled_at' => '',
        ]);
        info("installed app");

    }

    public function checkFeature()
    {
        try {
            $appFeature = config('custom.feature');
            if (!$appFeature) {
                return;
            }
            $appFeatureStatus = config('custom.feature_status');
            $feature = \LaravelFeature\Model\Feature::where('name', $appFeature)->first();
            if (!$feature && $appFeatureStatus == 'ON') {
                Feature::add($appFeature, false);
                info('Create feature: ' . $appFeature);

            }

            $shopsUsed = DB::table('featurables')->count();
            $maxUser = (int)config('custom.feature_max_user', 1);
            if ($shopsUsed >= $maxUser) {
                return;
            }
            //$user = auth()->user();
            $user = User::where('id', auth()->user()->id)->first();
            if ($appFeatureStatus == 'ON' && ($this->isEligible($user)) && !Feature::isEnabledFor($appFeature, $user)) {
                Feature::enableFor($appFeature, $user);
                info('feature ' . $appFeature . ' enable for shop ' . $user->shop_name);
            }

            return;
        } catch (Exception $e) {
            logger($e->getMessage());

            return;
        }
    }

    /**
     * @param $user
     *
     * @return bool
     */
    private function isEligible($user)
    {
        info(print_r(explode(',', config('custom.feature_test'))));
        if (config('custom.feature_test')) {
            return in_array($user->shop_id, explode(',', config('custom.feature_test')));
        }
        $rate = (int)config('custom.feature_rate');
        if ($rate <= 0) $rate = 1;

        return $user->shop_id % $rate == 0;
    }
}
