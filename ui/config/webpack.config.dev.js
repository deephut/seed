'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = '';
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

//return;
// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	// See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
	devtool: 'cheap-module-source-map',
	// These are the "entry points" to our application.
	// This means they will be the "root" imports that are included in JS bundle.
	// The first two entry points enable "hot" CSS and auto-refreshes for JS.
	entry: [
		// Include an alternative client for WebpackDevServer. A client's job is to
		// connect to WebpackDevServer by a socket and get notified about changes.
		// When you save a file, the client will either apply hot updates (in case
		// of CSS changes), or refresh the page (in case of JS changes). When you
		// make a syntax error, this client will display a syntax error overlay.
		// Note: instead of the default WebpackDevServer client, we use a custom one
		// to bring better experience for Create React App users. You can replace
		// the line below with these two lines if you prefer the stock client:
		// require.resolve('webpack-dev-server/client') + '?/',
		// require.resolve('webpack/hot/dev-server'),
		require.resolve('react-dev-utils/webpackHotDevClient'),
		// We ship a few polyfills by default:
		require.resolve('./polyfills'),
		// Finally, this is your app's code:
		paths.appIndexJs
		// We include the app code last so that if there is a runtime error during
		// initialization, it doesn't blow up the WebpackDevServer client, and
		// changing JS code would still trigger a refresh.
	],
	output: {
		// Next line is not used in dev but WebpackDevServer crashes without it:
		path: paths.appBuild,
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true,
		// This does not produce a real file. It's just the virtual path that is
		// served by WebpackDevServer in development. This is the JS bundle
		// containing code from all our entry points, and the Webpack runtime.
		filename: 'static/js/bundle.js',
		// This is the URL that app is served from. We use "/" in development.
		publicPath: publicPath
	},
	resolve: {
		modules: [paths.appSrc, 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
	},
	module: {
		rules: [
			// ** ADDING/UPDATING LOADERS **
			// The "url" loader handles all assets unless explicitly excluded.
			// The `exclude` list *must* be updated with every change to loader extensions.
			// When adding a new loader, you must add its `test`
			// as a new entry in the `exclude` list for "url" loader.

			// "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
			// Otherwise, it acts like the "file" loader.
			{
				exclude: [
					/\.html$/,
					// We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
					// because you might change the hot reloading server from the custom one
					// to Webpack's built-in webpack-dev-server/client?/, which would not
					// get properly excluded by /\.(js|jsx)$/ because of the query string.
					// Webpack 2 fixes this, but for now we include this hack.
					// https://github.com/facebookincubator/create-react-app/issues/1713
					/\.(js|jsx)(\?.*)?$/,
					/\.(ts|tsx)(\?.*)?$/,
					/\.scss$/,
					/\.json$/
				],
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'static/media/[name].[hash:8].[ext]'
					}
				}]
			},
			{
				test: /\.(ts|tsx)$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				include: paths.appSrc
			},
			{
				test: /\.(ts|tsx)$/,
				include: paths.appSrc,
				exclude: [/node_modules/],
				use: [{
					loader: 'ts-loader'
				}]
			},
			{
				test: /\.scss/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'typings-for-css-modules-loader',
					options: {
						modules: true,
						namedExport: true,
						camelCase: true,
						importLoaders: 1,
						localIdentName: '[name]_[local]_[hash:base64:5]'
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						includePaths: [paths.themePath]
					}
				}]
			},
			// JSON is not enabled by default in Webpack but both Node and Browserify
			// allow it implicitly so we also enable it.
			{
				test: /\.json$/,
				loader: 'json'
			}
			// ** STOP ** Are you adding a new loader?
			// Remember to add the new extension(s) to the "url" loader exclusion list.
		]
	},
	plugins: [
		// Makes some environment variables available in index.html.
		// The public URL is available as %PUBLIC_URL% in index.html, e.g.:
		// <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
		// In development, this will be an empty string.
		new InterpolateHtmlPlugin(env.raw),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
		new webpack.DefinePlugin(env.stringified),
		// This is necessary to emit hot updates (currently CSS only):
		new webpack.HotModuleReplacementPlugin(),
		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebookincubator/create-react-app/issues/240
		new CaseSensitivePathsPlugin(),
		// If you require a missing module and then `npm install` it, you still have
		// to restart the development server for Webpack to discover it. This plugin
		// makes the discovery automatic so you don't have to restart.
		// See https://github.com/facebookincubator/create-react-app/issues/186
		new WatchMissingNodeModulesPlugin(paths.appNodeModules),
		new webpack.LoaderOptionsPlugin({
			options: {
				tslint: {
					configFile: paths.tsLintConfig,
					tsConfigFile: paths.tsConfig,
					failOnHint: false
				}
			},
		})
	],
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};
