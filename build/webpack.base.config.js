const path = require('path')
const glob = require('glob')
const dev = require('./wepack.dev.config')
const prod = require('./webpack.prod.config')
const { merge } = require('webpack-merge')
// 自动化生成模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// ts-import
const tsImportPluginFactory = require('ts-import-plugin')
// 删除无用css
const PurgecssPlugin = require('purgecss-webpack-plugin')
// cdn 引入资源
// tree-shaking es6
// 多线程打包 happypack

// 引入dllplugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = (env) => {
	const isDev = env.development
	const base = {
		devtool: isDev ? 'cheap-module-eval-source-map' : false,
		entry: path.resolve(__dirname, '../src/index.ts'),
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, '../dist'),
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx', '.vue'],
			alias: {
				'@': path.resolve(__dirname, '../src'),
			},
		},
		externals: {
			jquery: '$',
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: true,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
					},
					default: {
						minSize: 1, // 不是第三方模块，被引入两次也会被抽离
						minChunks: 2,
						priority: -20,
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: 'vue-loader',
				},
				{
					test: /\.(ts|tsx|js|jsx)$/,
					use: {
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
							transpileOnly: true,
							getCustomTransformers: () => ({
								before: [
									tsImportPluginFactory({
										libraryName: 'vant',
										libraryDirectory: 'es',
										style: true,
									}),
								],
							}),
							compilerOptions: {
								module: 'es2015',
							},
						},
					},
					exclude: /node_modules/,
				},
				{
					test: /\.(css|less)$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
						'postcss-loader',
						'less-loader',
					],
				},
				{
					test: /\.jpe?g|png|gif/,
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
									quality: [0.9, 0.95],
									speed: 4,
								},
								gifsicle: {
									interlaced: false,
								},
								// the webp option will enable WEBP
								webp: {
									quality: 75,
								},
							},
						},
						{
							loader: 'url-loader',
							options: {
								limit: 100 * 1024,
								name: `img/[name].[ext]`,
							},
						},
					],
				},
				{
					test: /\.(woff|ttf|eot|svg|otf)/,
					use: {
						loader: 'file-loader',
					},
				},
			],
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.resolve(__dirname, '../public/index.html'),
				hash: true,
				minify: {
					removeComments: true, // 删除注释
					removeAttributeQuotes: true, // 删除属性双引号
				},
			}),
			!isDev &&
				new MiniCssExtractPlugin({
					filename: 'css/[name].[contentHash:8].css',
				}),
			!isDev &&
				new PurgecssPlugin({
					paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
						nodir: true,
					}), // 不匹配目录，只匹配文件
				}),
			// 构建时会引用动态链接库的内容
			new DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll/manifest.json'),
			}),
			// 需要手动引入vue.dll.js
			new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll/vue.dll.js'),
			}),
		].filter(Boolean),
	}
	if (isDev) {
		return merge(base, dev)
	}
	return merge(base, prod)
}
