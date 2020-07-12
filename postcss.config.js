module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 37.5,
			unitPrecision: 5,
			propList: ['*', '!font', '!font-size', '!line-height', '!letter-spacing'],
			selectorBlackList: [
				'.van',
			],
			replace: true,
			mediaQuery: false,
			minPixelValue: 3,
			exclude: /node_modules/i,
		},
	},
}
