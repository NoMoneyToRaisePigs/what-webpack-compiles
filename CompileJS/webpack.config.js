const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
   mode: 'development',
   devtool: 'source-map',
   entry: './src/index.js',
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
    ],
}

