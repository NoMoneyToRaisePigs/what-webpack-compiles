const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container; 
const getRemoteConfig = require('./webpack.remotes.js')
const PREFIX = 'federation-shell'

const ModuleFedSingleRuntimePlugin = require('./merge-runtime.js')
const shared = require('./sharedDependencies')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
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
      // devtoolModuleFilenameTemplate: (info) => {
      //   const resPath = info.resourcePath.split(path.sep).join('/')
      //   const isVue = resPath.match(/\.vue$/)
      //   const isGenerated = info.allLoaders

      //   const generated = `webpack-generated:///${resPath}?${info.hash}`
      //   const vuesource = `your-source:///${resPath}`

      //   return isVue && isGenerated ? generated : vuesource
      // },
      // devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
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
      port: 8081,
      hot: true,
      proxy: {
        '/federation-share/': {
          target: 'http://localhost:8082',
          changeOrigin: true
        },
        '/federation-binance/': {
          target: 'http://localhost:8083',
          changeOrigin: true
        },
        '/': {
          target: `http://localhost:8081/`,
          pathRewrite: { '^/': `${PREFIX}` },
          changeOrigin: false
        }
      },
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
      // concatenateModules: false,
      // usedExports: true,
      // minimize: true,
      // minimizer: [new TerserPlugin()],
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
        },
        exposes: {
          "./components/increase-count": "./src/components/increase-count.vue",
          "./utils": "./src/utils/index.js",
        },
        shared,
      }),
    ],
}