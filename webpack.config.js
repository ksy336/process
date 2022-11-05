const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const svgToTinyDataUri = require('mini-svg-data-uri');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chunks = require('./pages.config');

const getFiles = (ext, filesPath) =>
	fs.readdirSync(path.resolve(__dirname, filesPath)).filter(fileName => fileName.endsWith(`.${ext}`));

const pages = getFiles('pug', 'src/pug');
// const includes = getFiles('pug', 'src/pug/includes');

module.exports = (env, { mode = 'development' } = {}) => ({
	mode: mode,
	target: mode === 'development' ? 'web' : 'browserslist',
	devtool: mode === 'development' ? 'source-map' : false,
	entry: {
		index: ['./src/scripts/index.js'],
		...chunks?.entries,
	},
	output: {
		filename: 'scripts/[name].[contenthash].js',
		// устранение бага dev-server, когда картинки могут исчезнуть при изменении стилей или js
		clean: env.WEBPACK_SERVE ? { keep: /^(fonts|images|assets|videos)\// } : true,
		path: path.resolve(__dirname, mode === 'development' ? 'dev' : 'dist'),
		asyncChunks: true,
		// assetModuleFilename: 'images/[hash][ext][query]',
	},
	resolve: {
		alias: {
			Images: path.resolve(__dirname, 'src/images/'),
			Fonts: path.resolve(__dirname, 'src/fonts/'),
			Pug: path.resolve(__dirname, 'src/pug/'),
			// Scripts: path.resolve(__dirname, 'src/scripts/'),
			Styles: path.resolve(__dirname, 'src/styles/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-flexbugs-fixes', 'autoprefixer', 'postcss-normalize'],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.svg$/i,
				type: 'asset/inline',
				generator: {
					dataUrl: content => {
						content = content.toString();
						return svgToTinyDataUri(content);
					},
				},
			},
			{
				test: /\.(mp4|mov)$/,
				type: 'asset/resource',
				generator: {
					filename: 'videos/[hash][ext][query]',
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash][ext][query]',
				},
				use: [
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							// webp: {
							// 	quality: 75,
							// },
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]',
				},
			},
			{
				test: /\.pug$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'pug-loader',
					options: {
						pretty: true,
					},
				},
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},

					},
				],
			},
		],
	},
	plugins: [
		mode !== 'development' ? new RemoveEmptyScriptsPlugin() : () => {},
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
		}),
		// new webpack.ProvidePlugin({
		// 	Swiper: './components/swiper-bundle.min.js',
		// }),
		...pages.map(
			page =>
				new HtmlWebpackPlugin({
					template: `./src/pug/${page}`,
					filename: `${page.replace(/\.pug$/, '.html')}`,
					chunks: [...(chunks?.config?.[page.replace(/\.pug$/, '')] ?? ['index'])],
				})
		),
		// ...includes.map(
		// 	component =>
		// 		new HtmlWebpackPlugin({
		// 			template: `./src/pug/includes/${component}`,
		// 			filename: `includes/${component.replace(/\.pug$/, '.html')}`,
		// 			inject: false,
		// 		})
		// ),
		// new BundleAnalyzerPlugin(),
	],
	performance: {
		maxEntrypointSize: 512000,
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
		runtimeChunk: mode === 'development' ? 'single' : false,
		minimizer: mode === 'development' ? [] : [new CssMinimizerPlugin(), '...'],
		// minimize: false,
	},
	devServer: {
		watchFiles: ['src/pug/**/*'],
	},
});
