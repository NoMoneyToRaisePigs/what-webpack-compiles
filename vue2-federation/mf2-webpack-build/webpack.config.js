const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { ModuleFederationPlugin } = require('webpack').container; 

const PREFIX = 'federation-mf2'

// const ModuleFedSingleRuntimePlugin = require('./merge-runtime.js')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    cache: false,
    entry: {
        app: [path.resolve(__dirname, './src/index.js')]
    },
    output: {
      uniqueName: '__federation_mf2__',
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
      port: 8086,
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
      },
      proxy: {
        // '/federation-vhost/': {
        //   target: 'http://localhost:5173',
        //   changeOrigin: true
        // },
        // '/federation-binance/': {
        //   target: 'http://localhost:8083',
        //   changeOrigin: true
        // }
      },
    },
    optimization: {
      runtimeChunk: 'single',
      // runtimeChunk: false,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.(svg|png|jpe?g|gif|webp)(\?.*)?$/,
          type: 'asset/resource'
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'),
        filename: `${PREFIX}/index.html`,
        publicPath: 'auto',
      }),
      new ModuleFederationPlugin({
        name: '__federation_mf2__',
        filename: 'remoteEntry.js',
        exposes: {
          // Set the modules to be exported, default export as '.'
          './utils': './src/index.js',
        },
      }),
    //   new ModuleFedSingleRuntimePlugin(PREFIX),
    ],
}