<?php


namespace App;


use LaravelFeature\Featurable\Featurable;
use LaravelFeature\Featurable\FeaturableInterface;

class User extends \Secomapp\Models\User implements FeaturableInterface
{
    use Featurable;
}
