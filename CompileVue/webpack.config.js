const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // devtoolModuleFilenameTemplate: info => { 
    //   return info.resourcePath.match(/^\.\/\S*?\.vue$/) ? `webpack-generated:///${info.resourcePath}?${info.hash}` : `webpack-yourCode:///${info.resourcePath}`,
    // },
    devtoolModuleFilenameTemplate: (info) => {
      let resPath = info.resourcePath.split(path.sep).join("/");
      let isVue = resPath.match(/\.vue$/);
      let isGenerated = info.allLoaders;
      
      let generated = `webpack-generated:///${resPath}?${info.hash}`;
      let vuesource = `your-source:///${resPath}`;
      
      return isVue && isGenerated ? generated : vuesource;
    },
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
   },
   module: {
      rules: [
         {
            test: /\.vue$/,
            loader: 'vue-loader'
         },
         {
            test: /\.css$/,
            use: [
               'style-loader',
               'css-loader'
            ]
         },
        //  {
        //     test: /\.tsx?$/,
        //     use: [
        //        {
        //           loader: 'ts-loader',
        //           options: {
        //               configFile: path.resolve(__dirname, './tsconfig.json'),
        //               appendTsSuffixTo: [/\.vue$/]
        //           }  
        //        }
        //     ],
        //     exclude: /node_modules/,
        //   },
      ],
   },
   plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ],
  // devtool: 'eval-source-map',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
      // splitChunks: {
      //   chunks: 'initial',
      //   minSize: 20000,
      //   minRemainingSize: 0,
      //   minChunks: 1,
      //   maxAsyncRequests: 30,
      //   maxInitialRequests: 30,
      //   enforceSizeThreshold: 50000,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10,
      //       reuseExistingChunk: true,
      //     },
      //     default: {
      //       minChunks: 2,
      //       priority: -20,
      //       reuseExistingChunk: true,
      //     },
      //   },
      // },
    },
   devServer: {

    },
};

//????
//@Vue-compiler ?

