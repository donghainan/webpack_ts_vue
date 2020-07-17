const path = require('path')
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin')
// 打包分析
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 打包进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
// 打包提示
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
module.exports = {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minSize: 1, // 不是第三方模块，被引入两次也会被抽离
					minChunks: 2,
					priority: -20
				}
			}
		},
		minimizer: [
			new TerserJSPlugin({
				// parallel: false,
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		// new BundleAnalyzerPlugin({
		// 	openAnalyzer: false,
		// }),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: false
		}),
		new WebpackBuildNotifierPlugin({
			title: 'My Project Webpack Build',
			logo: path.resolve('./logo.jpg'),
			suppressSuccess: true
		})
	]
}
