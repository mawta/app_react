<?php

namespace App\Traits;

use Secomapp\Traits\InstalledShop;


trait CheckTraits {
    use InstalledShop;

    public function fetch(){
        $check = $this->check();
        $isTitle=false;
        $isDes=false;
        if (!$check['title']){
            $check['title'] = "Your store doesn't have a title";
        }
        if ($check['title'] == "Your title is pretty good"){
            $isTitle=true;
        }

        if (!$check['description']){
            $check['description'] = "Your store doesn't have a description tag";
        }
        if ($check['description'] == "Your description is pretty good"){
            $isDes=true;
        }
        return [
            'isJson' => $this->CheckJsonLd(),
            'googleAnalytics' => $check['googleAnalytics'],
            'googleSiteVerification' => $check['googleSiteVerification'],
            'titleDes' =>$check['title'],
            'isTitle' => $isTitle,
            'desDes' => $check['description'],
            'isDes' => $isDes,
        ];
    }

    public function CheckJsonLd()
    {
        $isJsonLd = shopSetting($this->shopId(), 'is_json_ld_installed', false);
        if (!$isJsonLd || $isJsonLd == 'no') {
            return false;
        }
        return true;
    }

    public function check()
    {
        $titleDescript = false;
        $shopName = $this->shopName();
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', "https://${shopName}.myshopify.com");
        $content = $res->getBody()->getContents();
        $temp = strpos($content, "<title>");
        $endTitle = strpos($content, '</title>');
        $titleLength = $endTitle - $temp - 7;
        if(!$temp){
            $titleDescript = false;
        }
        else if($titleLength < 10){
            $titleDescript = "Your title is too short";
        }elseif ($titleLength >69){
            $titleDescript = "Your title is too long";
        }else{
            $titleDescript = "Your title is pretty good";
        }

        $desDescript = false;
        $temp1 = strpos($content, "<meta name='description' content=");
        $endDes = strpos($content, '>', $temp1);
        $desLength = $endDes - $temp1 - 34;
        if(!$temp1){
            $desDescript = false;
        }
        elseif ($desLength < 10){
            $desDescript = "Your description is too short";
        }elseif ($desLength >199){
            $desDescript = "Your description is too long";
        }else{
            $desDescript = "Your description is pretty good";
        }

        $googleAnalytics = strpos($content, 'https://www.googletagmanager.com/gtag/js');
        $googleAnalytics = ($googleAnalytics) ? true: false;
        $googleSiteVerifi = strpos($content, 'google-site-verification');
        $googleSiteVerifi = ($googleSiteVerifi) ? true : false;
        return ['title' => $titleDescript,'description' =>$desDescript ,'googleAnalytics' => $googleAnalytics, 'googleSiteVerification' => $googleSiteVerifi];
    }
}