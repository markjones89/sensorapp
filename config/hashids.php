<?php

/**
 * Copyright (c) Vincent Klaiber.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/vinkla/laravel-hashids
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

    'default' => 'main',

    /*
    |--------------------------------------------------------------------------
    | Hashids Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Example
    | configuration has been included, but you may add as many connections as
    | you would like.
    |
    */

    'connections' => [

        'main' => [
            'salt' => 'n3wc0Apps@lt',
            'length' => '5',
            'alphabet' => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        ],

        'alternative' => [
            'salt' => 'altn3wc0Apps@lt',
            'length' => '8',
            'alphabet' => '0123456789abcdefghijklABCDEFGHIJKLmnopqrstuvwxyzMNOPQRSTUVWXYZ'
        ],

        'user' => [
            'salt' => 'Us3rn3wc0Apps@lt',
            'length' => '16',
            'alphabet' => '0123456789abcdef'
        ],

    ],

];
