const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container; 
const getRemoteConfig = require('./webpack.remotes.js')
const PREFIX = 'federation-shell'

const ModuleFedSingleRuntimePlugin = require('./merge-runtime.js')
const ApiCallPlugin = require('./ApiCallPlugin.js')


const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "production",
    // devtool: 'hidden-source-map',
    cache: false,
    entry: {
        app: [path.resolve(__dirname, './src/main.js')]
      },
    output: {
      uniqueName: '__federation_shell__',
      path: path.resolve(__dirname, './dist'),
      filename: `${PREFIX}/static/js/[name].js`,
      chunkFilename: `${PREFIX}/static/js/[name].js`,
      assetModuleFilename: `${PREFIX}/static/asset/[name][ext][query]`,
      pathinfo: false,
      clean: true,
      publicPath: 'auto',
    },
    resolve: {
      symlinks: false,
      extensions: ['.ts', '.mjs', '.js', '.vue', '.json', '.wasm'],
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      modules: ['node_modules'],
    },
    optimization: {
      runtimeChunk: 'single',
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimize: false,
      concatenateModules: false,
      usedExports: true,
    //   minimize: true,
    //   minimizer: [new TerserPlugin({
    //     terserOptions: {
    //         compress: {
    //             defaults: false,
    //             unused: true
    //         },
    //         mangle: false,
    //         keep_classnames: true,
    //         keep_fnames: true
    //       }
    //   })],
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
        },
        chunks: ['__federation_shell__', 'app'],
        chunksSortMode: 'manual',
      }),
      new ModuleFedSingleRuntimePlugin(PREFIX),
      new ModuleFederationPlugin({
        name: '__federation_shell__',
        filename: `${PREFIX}/remoteEntry.js`,
        remotes: {
          share: getRemoteConfig('share'),
          binance: getRemoteConfig('binance')
          // share: 'share@http://localhost:8082/remoteEntry.js',
        },
        exposes: {
            "./views/profile": {
              import: "./src/views/profile/index.vue",
              name: "profile"
            },
            "./views/user": {
              import: "./src/views/user/index.vue",
              name: "user"
            },
          },
        shared: {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: '2.7.15'
          },
          'vue-router': {
            eager: true,
            singleton: true,
            requiredVersion: '3.0.2'
          },
        }
      }),
      new ApiCallPlugin()
    ],
}