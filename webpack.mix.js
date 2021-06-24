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
    // resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //         '@': __dirname + '/resources/js'
    //     },
    // },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             default: false,
    //             vendors: {
    //                 chunks: 'initial',
    //                 name: 'js/vendor',
    //                 // filename: 'js/[name].js'
    //             }
    //             // commons: { test: /[\\/]node_modules[\\/]/, name: "js/vendor", chunks: "all" }
    //         }
    //     },
    // },
    output: {
        publicPath: mix.inProduction() ? `${process.env.MIX_APP_BASE_URL}/` : '/'
    }
})

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    // widgets
    .js('resources/js/widgets/time-chart.js', 'public/js/widgets');

mix.disableNotifications();