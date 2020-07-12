const path = require('path')
module.exports = {
	mode: 'development',
	// 开发环境开启tree-shaking
	optimization: {
		usedExports: true,
	},
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		compress: true,
		host: 'localhost',
		port: 3000,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://192.168.1.30:8085', //代理地址，这里设置的地址会代替axios中设置的baseURL
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				//ws: true, // proxy websockets
				//pathRewrite方法重写url
				pathRewrite: {
					'^/api': '/',
					//pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
					//pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
				},
			},
		},
	},
}
