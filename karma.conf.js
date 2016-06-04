module.exports = function(config) {
    config.set({
        /**
         * These are the files required to run the tests.
         *
         * The `Function.prototype.bind` polyfill is required by PhantomJS
         * because it uses an older version of JavaScript.
         */
        files: [
            'tests/**/index.js'
        ],

        /**
         * The actual tests are preprocessed by the karma-webpack plugin, so that
         * their source can be properly transpiled.
         */
        preprocessors: {
            'tests/**/*.js': [ 'webpack' ]
        },

        /**
         * Start these browsers for testing. PhantomJS is a headless browser.
         * Available browsers: https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: [ 'PhantomJS' ],

        /**
         * Use Mocha as the test framework, Sinon for mocking, and
         * Chai for assertions.
         */
        frameworks: [ 'mocha', 'chai', 'es6-shim' ],

        /**
         * The configuration for the karma-webpack plugin.
         * This is very similar to the main webpack.local.config.js.
         */
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel'
                    }
                ]
            },
            resolve: {
                // empty string is important: https://github.com/webpack/karma-webpack/issues/33#issuecomment-136720643
                extensions: [ '', '.js' ],
                modulesDirectories: [
                    'node_modules',
                    'es6'
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        singleRun: false,

        /**
         * Array of plugins used
         */
        plugins: [
            'karma-chai',
            'karma-es6-shim',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-webpack'
        ]
    });
};