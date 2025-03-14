// const CompilerSfc = require('@vue/compiler-sfc')
// const parse = CompilerSfc.parse
// CompilerSfc.parse = (source, options) => {
//    return parse(source, {
//       ...options,
//       pad: true
//    })
// }

const path = require('path');
const Webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container; 
module.exports = {
  mode:'development',
  entry: './src/main.ts',
  output: {

    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    assetModuleFilename: 'static/asset/[name][ext][query]',
    pathinfo: false,
    clean: true,


    uniqueName: 'myVue3',
    // filename: '[name].js',
    // chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    devtoolModuleFilenameTemplate: (info) => {
      let resPath = info.resourcePath.split(path.sep).join("/");
      let isVue = resPath.match(/\.vue$/);
      let isGenerated = info.allLoaders;
      
      let generated = `webpack-generated:///${resPath}?${info.hash}`;
      let vuesource = `your-source:///${resPath}`;
      
      return isVue && isGenerated ? generated : vuesource;
     },
    //  devtoolModuleFilenameTemplate: info => {
    //   if (info.allLoaders === '') {
    //     // when allLoaders is an empty string the file is the original source
    //     // file and will be prefixed with src:// to provide separation from
    //     // modules transpiled via webpack
    //     const filenameParts = ['src://']
    //     if (info.namespace) {
    //       filenameParts.push(info.namespace + '/')
    //     }
    //     filenameParts.push(info.resourcePath.replace(/^\.\//, ''))
    //     return filenameParts.join('')
    //   } else {
    //     // otherwise we have a webpack module
    //     const filenameParts = ['webpack://']
    //     if (info.namespace) {
    //       filenameParts.push(info.namespace + '/')
    //     }
    //     filenameParts.push(info.resourcePath.replace(/^\.\//, ''))
    //     const isVueScript = info.resourcePath.match(/\.vue$/) &&
    //       info.query.match(/\btype=script\b/) &&
    //       !info.allLoaders.match(/\bts-loader\b/)
    //     if (!isVueScript) {
    //       filenameParts.push('?' + info.hash)
    //     }
    //     return filenameParts.join('')
    //   }
    // },
   devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, './src')
      },
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
         {
            test: /\.ts$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-typescript', {
                    // 这个配置是为了处理.vue文件解析后的ts文件
                    allExtensions: true
                  }]
                ]
              }
            }
         },
         
         // {
         //    test : /\.ts$/,      
         //    use: [
         //      'babel-loader',
         //      {
         //        loader: 'ts-loader',
         //         options: {
         //          configFile: path.resolve(__dirname, './tsconfig.json'),
         //          appendTsSuffixTo: [/\.vue$/],
         //        },
         //      },
         //    ],
         //    exclude: /node_modules/,
         //  },
         
         // {
         //    test: /\.tsx?$/,
         //    use: [
         //       {
         //          loader: 'ts-loader',
         //          options: {
         //              configFile: path.resolve(__dirname, './tsconfig.json'),
         //              appendTsSuffixTo: [/\.vue$/]
         //          }  
         //       }
         //    ],
         //    exclude: /node_modules/,
         //  },
      ],
   },
   plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
         template: './index.html'
      }),
      new Webpack.DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: true }),
      new ModuleFederationPlugin({
        name: "myVue3",
        filename: "remoteEntry.js",
        exposes: {
          "./TestCount": "./src/components/test.vue",
          "./renderer": "./src/utils/renderer.js",
        },
        // shared: {
        //   vue: {
        //     singleton: true,
        //     eager: true,
        //     requiredVersion: '3.2.47'
        //   }
        // }
      }),
   ],
  // devtool: 'eval-source-map',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimize: false
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       name: 'chunk-vendors',
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: 'chunk-common',
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
    // },
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
      port: 8082,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
    },
};