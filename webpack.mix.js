const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    output: {
        publicPath: mix.inProduction() ? `${process.env.MIX_APP_BASE_URL}/` : '/'
    }
})

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.js('resources/js/app-login.js', 'public/js')
    .sass('resources/sass/app-login.scss', 'public/css');

mix.js('resources/js/app-verify.js', 'public/js')
    .sass('resources/sass/app-verify.scss', 'public/css');
