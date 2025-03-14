const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container; 
const ApiCallPlugin = require('./ApiCallPlugin.js')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    cache: false,
    entry: {
        app: [path.resolve(__dirname, './src/main.js')]
      },
    output: {
      uniqueName: 'myVue2',
      path: path.resolve(__dirname, './dist'),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].js',
      assetModuleFilename: 'static/asset/[name][ext][query]',
      pathinfo: false,
      clean: true,
      publicPath: 'auto',
      devtoolModuleFilenameTemplate: (info) => {
        const resPath = info.resourcePath.split(path.sep).join('/')
        const isVue = resPath.match(/\.vue$/)
        const isGenerated = info.allLoaders

        const generated = `webpack-generated:///${resPath}?${info.hash}`
        const vuesource = `your-source:///${resPath}`

        return isVue && isGenerated ? generated : vuesource
      },
      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    devServer: {
      port: 8083,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
      client: {
        logging: 'error',
        overlay: {
          warnings: false
        }
      }
    },
    optimization: {
      runtimeChunk: false,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimize: false
    },
    module: {
      rules: [
        { test: /\.vue$/, loader: "vue-loader" },
        {
          test: /\.css|.sass|.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'fast-sass-loader'
            }
          ]
        },
        {
          test: /\.(svg|png|jpe?g|gif|webp)(\?.*)?$/,
          type: 'asset/resource'
        },
      ]
    },
    plugins: [
      new ApiCallPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
        publicPath: 'auto',
        templateParameters: {
          'VUE_APP_TITLE': process.env.VUE_APP_TITLE
        }
      }),
      // new ModuleFederationPlugin({
      //   name: "myVue2",
      //   filename: "remoteEntry.js",
      //   remotes: {
      //     myVue3: 'myVue3@http://localhost:8082/remoteEntry.js',
      //   },
      //   exposes: {
      //     "./IncreaseCount": "./src/components/increase-count.vue",
      //     "./renderer": "./src/utils/renderer.js",
      //   },
      //   // shared: {
      //   //   vue: {
      //   //     singleton: true,
      //   //     eager: true,
      //   //     requiredVersion: '3.2.47'
      //   //   }
      //   // }
      // }),
    ],

}