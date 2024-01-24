// const ConcatSource = require('webpack-sources/lib/ConcatSource')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = class ModuleFedSingleRuntimePlugin {
  constructor(publicPath) {
    this._options = {
      remoteEntry: 'remoteEntry.js',
      runtime: `runtime.js`,
      publicPath
    }
  }
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    if (!this._options) return null
    const options = this._options

    compiler.hooks.compilation.tap('GFPlugin', (compilation) => {
      compilation.hooks.processAssets.tap({
        name: 'EnableSingleRunTimeForFederationPlugin',
        stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        additionalAssets: true
      }, (assets) => {
        console.log('List of assets and their sizes:')
        Object.entries(assets).forEach(([pathname, source]) => {
          if (pathname.includes(this._options.remoteEntry)) {
            // console.log('now myyyyyyyyyyyy logic')
            console.log('--------', `${this._options.publicPath}${this._options.runtime}`)

            const runtime = assets[`${this._options.publicPath}${this._options.runtime}`]
            // const runtimeRmote = assets[`${this._options.publicPath}${this._options.runtime}`]


            assets[pathname] = new compiler.webpack.sources.ConcatSource(runtime.source(), '/* terence test */', source)
            
            const sections = pathname.split('.')
            const newName = `${sections[0]}x.${sections[1]}`
            console.log('xxxxxx', newName)
            assets[newName] = source
            
            // assets[pathname] = new compiler.webpack.sources.ConcatSource(source, '/* terence test */', runtime.source())

            const xxx = `${this._options.publicPath}${this._options.runtime}`
            console.log(`—- ${xxx}: ${runtime.size()} bytes`)
          }

          console.log(`— ${pathname}: ${source.size()} bytes`)
        })
      })

      compilation.hooks.processAssets.tap({
        name: 'RemoveRuntime',
        stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        additionalAssets: true
      }, (assets) => {
        console.log('List of assets and their sizes:')
        Object.entries(assets).forEach(([pathname, source]) => {
          if (pathname.includes(this._options.runtime)) {
            console.log('----- remove runtime')
            // assets[pathname.replace('runtime', 'runtime-x')] = new compiler.webpack.sources.ConcatSource('console.log("runtime-X")')
            assets[pathname] = new compiler.webpack.sources.ConcatSource('console.log("remove runtime")')
          }
        })
      })
    })
  }
}
