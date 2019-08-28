<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BrokenLink extends Model
{
    protected $table = 'brokenlinks';

    protected $fillable = [
        'shop_id',
        'find_on_url',
        'broken_link'
    ];
    /**
     * Get shop info
     */
    public function shop()
    {
        return $this->belongsTo('Secomapp\Models\Shop');
    }
}
