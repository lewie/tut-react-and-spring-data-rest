var path = require('path');
const webpack = require('webpack');
//const fsevents = require('fsevents');
//"fsevents": "^1.1.3",
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const node_dir = __dirname + '/node_modules';

//https://webpack.js.org/guides/migrating/#resolve-root-resolve-fallback-resolve-modulesdirectories
//https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
//https://remarkablemark.org/blog/2017/02/25/webpack-ignore-module/

module.exports = {
    entry: './src/main/js/app.js',
    //devtool: 'sourcemaps',
    cache: true,
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    //debug: true,
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
		//new webpack.IgnorePlugin(/fsevents/),
		new webpack.IgnorePlugin(/vertx/),
		//new webpack.IgnorePlugin(/loadLoader/),
		//new webpack.IgnorePlugin(/UglifyJsPlugin/),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new UglifyJsPlugin({//https://github.com/webpack-contrib/uglifyjs-webpack-plugin
			cache: true,
		    parallel: true,//-> WARNING in ./node_modules/uglify-js/tools/node.js
		    sourceMap: true,
		    uglifyOptions: {
		    	ie8: false,
			    safari10: false
		    }
		})
	],
    
//    //New since webpack 2
    module: {//https://webpack.js.org/guides/migrating/
//	    stats: {
//	        // Configure the console output
//	        errorDetails: true, //this does show errors
//	        colors: true,
//	        modules: true,
//	        reasons: true
//	    },
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
    
    //Old: webpack 1
//    module: {//https://webpack.js.org/guides/migrating/
//        loaders: [
//            {
//                test: path.join(__dirname, '.'),
//                exclude: /(node_modules)/,
//                loader: 'babel-loader',
//                query: {
//                    cacheDirectory: true,
//                    presets: ['es2015', 'react']
//                }
//            }
//        ]
//    }

    
    
    
    
// EXAMLE
// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/104
//    module.exports = {
//        entry: [
//            path.join(config.paths.client, '/js/index.js')
//        ],
//        output: {
//            path: path.join(__dirname, './build/release/'),
//            filename: '[name].js'
//        },
//        module: {
//            loaders: [{
//                    test: /\.(js|jsx)$/,
//                    loader: 'jsx-loader'
//                }, {
//                    test: /\.js$/,
//                    loader: "eslint-loader",
//                    exclude: /node_modules/
//                }, {
//                    exclude: /node_modules/,
//                    loader: 'babel-loader',
//                    test: /\.(js|jsx)$/
//            }]
//        }
//    };
    
    
    
};