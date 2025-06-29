const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container; 
const getRemoteConfig = require('./webpack.remotes.js')
const PREFIX = 'federation-vite'

const ModuleFedSingleRuntimePlugin = require('./merge-runtime.js')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    cache: false,
    entry: {
        app: [path.resolve(__dirname, './src/main.js')]
    },
    output: {
      uniqueName: '__federation_vite__',
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
      port: 8085,
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
        '/federation-vhost/': {
          target: 'http://localhost:5173',
          changeOrigin: true
        },
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
      new ModuleFedSingleRuntimePlugin(PREFIX),
      new ModuleFederationPlugin({
        name: '__federation_vite__',
        filename: `${PREFIX}/remoteEntry.js`,
        // remotes: {
        //   // vhost: getRemoteConfig('vhost'),
        //   viteRemote: `promise import("http://localhost:8080/assets/remoteEntry.js")`,
        //   // viteRemote: `promise import("http://localhost:8080/assets/remoteEntry.js")`,
        //   // viteRemote: `promise new Promise(resolve => {
        //   //   const script = document.createElement('script');
        //   //   script.src = 'http://localhost:8080/assets/remoteEntry.js';
        //   //   script.onload = () => {
        //   //     resolve(window.viteRemote);
        //   //   };
        //   //   document.head.appendChild(script);
        //   // })`,
        // },

      // remotes: {
      //   viteRemote: `promise import("http://localhost:5173/remoteEntry.js")`,
      // },

      // remotes: {
      //   viteRemote: `viteRemote@http://localhost:8080/remoteEntry.js`, // Vite默认路径
      // },

      remotes: {
        viteRemote: `promise new Promise((resolve) => {
                      import("http://localhost:5173/remoteEntry.js").then(m => {
                          resolve(m);
                      });
                  })`,
      },


        exposes: {
          './utils': './src/utils/index.js',
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: '2.7.16'
          },
          'vue-router': {
            eager: true,
            singleton: true,
            requiredVersion: '3.6.5'
          },
        }
      })
    ],
}