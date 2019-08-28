<?php

namespace App\Services;

use Customerio\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;
use Secomapp\Models\ShopInfo;

class CustomerIO
{
    const EU_COUNTRIES = [
        'AT', 'BE', 'HR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
        'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'
    ];
    public $_client = null;
    public $_id = null;
    public $_email = null;
    public $_fullName = null;
    public $_countryCode = null;

    /**
     * CustomerIO constructor.
     *
     * @param ShopInfo $shopInfo
     */
    public function __construct($shopInfo = null)
    {
        $this->_client = new Client(config('customerio.apiKey'), config('customerio.siteId'));
        if ($shopInfo) {
            $this->setShopInfo($shopInfo);
        }
    }

    /**
     * @param ShopInfo $shopInfo
     */
    public function setShopInfo($shopInfo) {
        $this->_id = $shopInfo->shopify_id;
        $this->_email = $shopInfo->email;
        $this->_fullName = $shopInfo->shop_owner;
        $this->_countryCode = $shopInfo->plan_name === 'staff' ? 'GB' : $shopInfo->country_code;
    }

    /**
     * Update customer
     *
     * @param $customer array
     */
    public function updateCustomer($customer)
    {
        if (!in_array($this->_countryCode, self::EU_COUNTRIES)) {
            try {
                $customer['id'] = $this->_id;
                $customer['email'] = $this->_email;
                $customer['fullname'] = $this->_fullName;
                $this->_client->customers->add($customer);
                Log::info('Update customer ' . json_encode($customer));
            } catch (GuzzleException $e) {
                Log::error($e->getMessage());
                Log::error($e->getTraceAsString());
            }
        }
    }

    /**
     * Delete a customer by ID
     */
    public function deleteCustomer()
    {
        try {
            $this->_client->customers->delete(array(
                'id' => $this->_id
            ));
        } catch (GuzzleException $e) {
            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
        }
    }
}
