const path = require('path')
// 清空打包结果
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin')
// 打包分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
	mode: 'production',
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
}
