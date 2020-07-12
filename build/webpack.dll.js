const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
  mode:'production',
  entry: ['vue', 'vue-router', 'vuex', 'axios'],
  output: {
    filename: 'vue.dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: 'vue',
    libraryTarget: 'umd'
  },
  plugins: [
    new DllPlugin({
      name: 'vue',
      path: path.resolve(__dirname, '../dll/manifest.json')
    })
  ]
}
