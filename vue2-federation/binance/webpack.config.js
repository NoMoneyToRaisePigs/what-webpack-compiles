const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container; 
const getRemoteConfig = require('./webpack.remotesv2.js')
const PREFIX = 'federation-binance'

const ModuleFedSingleRuntimePlugin = require('./merge-runtime.js')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    cache: false,
    entry: {
        app: [path.resolve(__dirname, './src/main.js')]
      },
    output: {
      uniqueName: 'binance',
      path: path.resolve(__dirname, './dist'),
      filename: `${PREFIX}/static/js/[name].js`,
      chunkFilename: `${PREFIX}/static/js/[name].js`,
      assetModuleFilename: `${PREFIX}/static/asset/[name][ext][query]`,
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
      symlinks: false,
      extensions: ['.ts', '.mjs', '.js', '.vue', '.json', '.wasm'],
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      modules: ['node_modules'],
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
      runtimeChunk: 'single',
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimize: false,
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
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
        filename: `${PREFIX}/index.html`,
        publicPath: 'auto',
        templateParameters: {
          'VUE_APP_TITLE': process.env.VUE_APP_TITLE
        }
      }),
      new ModuleFedSingleRuntimePlugin(`${PREFIX}/static/js/`),
      new ModuleFederationPlugin({
        name: 'binance',
        filename: `${PREFIX}/remoteEntry.js`,
        remotes: {
          shell: getRemoteConfig('shell'),
          share: getRemoteConfig('share'),
          // shell: 'shell@http://localhost:8081/remoteEntry.js',
        },
        exposes: {
          './bcomponents': './src/components/index.js',
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: '2.7.15'
          }
        }
      })
    ],
}