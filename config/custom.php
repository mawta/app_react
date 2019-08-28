<?php
    return [
        'max_storage' => env('MAX_STORAGE'),
        'feature' => env('FEATURE_NAME', 'Test'),
        'feature_rate' => env('FEATURE_RATE', 1),
        'feature_test' => env('FEATURE_TEST', '1,2,3,4,5,6,7,8,9'),
        'feature_status' => env('FEATURE_STATUS', 'OFF'),
        'feature_used_by' => env('FEATURE_USED_BY_SHOP_ID',''),
        'feature_used_count' => env('FEATURE_USED_COUNT',''),
        'feature_max_user'=> env('FEATURE_MAX_USER','2'),
        'backup_storage' => env('BACKUP_STORAGE','backup'),
        'support_mail' => env('SUPPORT_MAIL','huyvd@vnteam.com'),
    ];
