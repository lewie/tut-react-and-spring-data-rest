var path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //USE ONLY PRODUCTION!!

const node_dir = __dirname + '/node_modules';

//https://webpack.js.org/guides/migrating/#resolve-root-resolve-fallback-resolve-modulesdirectories
//https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
//https://remarkablemark.org/blog/2017/02/25/webpack-ignore-module/

module.exports = {
    entry: './src/main/js/app.js',
//    devtool: 'sourcemaps', //USE ONLY DEVELOPMENT
    cache: true,
    //target: 'node', // 'node' default is 'web'
    resolve: {
        alias: {
            'stompjs': node_dir + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
	plugins: [
		new webpack.IgnorePlugin(/chokidar/),
		new webpack.IgnorePlugin(/vertx/),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new UglifyJsPlugin({ //USE ONLY PRODUCTION!! //https://github.com/webpack-contrib/uglifyjs-webpack-plugin
			cache: true,
		    parallel: true,//-> WARNING in ./node_modules/uglify-js/tools/node.js
		    sourceMap: false,
		    uglifyOptions: {
		    	ie8: false,
			    safari10: false
		    }
		}),
		new webpack.EnvironmentPlugin({
            NODE_ENV: 'development' //'development' //'production'
        })
	],
    
    //New since webpack 2 "webpack": "^3.11.0"
    module: {//https://webpack.js.org/guides/migrating/
    	rules: [
            {
                //test: path.join(__dirname, '.'),
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
    
};