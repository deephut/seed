'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var paths = require('./paths');
var getClientEnvironment = require('./env');


// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
var publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
var shouldUseRelativeAssetPaths = publicPath === './';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
var publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
	// Making sure that the publicPath goes back to to build folder.
	? {publicPath: Array(cssFilename.split('/').length).join('../')}
	: undefined;

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
	// Don't attempt to continue if there are any errors.
	bail: true,
	// We generate sourcemaps in production. This is slow but gives good results.
	// You can exclude the *.map files from the build during deployment.
	devtool: 'source-map',
	// In production, we only want to load the polyfills and the app code.
	entry: [
		require.resolve('./polyfills'),
		paths.appIndexJs
	],
	output: {
		// The build folder.
		path: paths.appBuild,
		// Generated JS file names (with nested folders).
		// There will be one main bundle, and one file per asynchronous chunk.
		// We don't currently advertise code splitting but Webpack supports it.
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		// We inferred the "public path" (such as / or /my-project) from homepage.
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
			// as a new entry in the `exclude` list in the "url" loader.

			// "url" loader embeds assets smaller than specified size as data URLs to avoid requests.
			// Otherwise, it acts like the "file" loader.
			{
				exclude: [
					/\.html$/,
					/\.(js|jsx)$/,
					/\.(ts|tsx)$/,
					/\.scss$/,
					/\.json$/
				],
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.(ts|tsx)$/,
				include: paths.appSrc,
				exclude: [/node_modules/],
				loader: 'ts-loader'
			},
			{
				test: /\.scss/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
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
				})
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
		// In production, it will be an empty string unless you specify "homepage"
		// in `package.json`, in which case it will be the pathname of that URL.
		new InterpolateHtmlPlugin(env.raw),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
		// It is absolutely essential that NODE_ENV was set to production here.
		// Otherwise React will be compiled in the very slow development mode.
		new webpack.DefinePlugin(env.stringified),
		// This helps ensure the builds are consistent if source hasn't changed:
		new webpack.optimize.OccurrenceOrderPlugin(),
		// Try to dedupe duplicated modules, if any:
		new webpack.optimize.DedupePlugin(),
		// Minify the code.
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true, // React doesn't support IE8
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
		// Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
		new ExtractTextPlugin(cssFilename),
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that tools can pick it up without
		// having to parse `index.html`.
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				tslint: {
					configFile: paths.tsLintConfig,
					tsConfigFile: paths.tsConfig,
					failOnHint: true,
					formatter: 'prose',
					fileOutput: {
						dir: paths.tsLintReport
					}
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
