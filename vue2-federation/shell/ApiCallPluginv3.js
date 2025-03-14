const { Console } = require('console')
const fs = require('fs')
// Used to list all the api calls in admin-ui, run on local only


class ApiCallPlugin {
  constructor(options) {
    this.options = options || {}
    this.logFilePath = this.options.logFilePath || 'logs/output.log'
    this.requestFilePaths = ['src/utils/http-request.ts', 'src/utils/raw-request.js', 'src/utils/request.ts']
  }
  apply(compiler) {
   
    let moduleTest 
    let map = new Map()

    compiler.hooks.make.tap('ApiCallPlugin', (compilation) => {
      function traverseModule(module) {
        // if(!module) {
        //   console.log('-------that is all----------')
        //   return
        // }
        Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(module)?.keys() ?? []).forEach(x => {
          // console.log(x?.resource)
          if(!map.get(x)) {
            map.set(x, true)
            console.log(x._source)
            traverseModule(x)
          }
        })
      }

      compilation.hooks.afterOptimizeDependencies.tap('chunkPlugin', (modules) => {
        console.log('==================Start optimizeChunks================== ')  

        modules.forEach(module => {
          // console.log(module)
          if(module.resource && module.resource.endsWith('user/api.js')) {
            // console.log(module.resource)
  
            // console.log(compilation.moduleGraph.getProfile(module))
            
            // console.log(module)

            console.log('*****************************************************************')
            module.dependencies.forEach(dep => {
                console.log('request:   ', dep.request)
                console.log('import vars:    ', dep.getImportVar && dep.getImportVar(compilation.moduleGraph))
                console.log('exports:',  dep.getExports(compilation.moduleGraph))
                console.log('-----------------------------------------')
            })
            console.log('*****************************************************************')
            
            // console.log(module.getExportsType(compilation.moduleGraph))
            // traverseModule(module)

            // Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(module).keys()).forEach(x => {
            //   console.log(x.resource)
            //   Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(x)?.keys() ?? []).forEach(y => {
            //     console.log('-----', y.resource)
            //     Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(y)?.keys() ?? []).forEach(z => {
            //       console.log('*********', z.resource)
            //       Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(z)?.keys() ?? []).forEach(a => {
            //         console.log('++++++++++++++', a.resource)
            //         Array.from(compilation.moduleGraph.getOutgoingConnectionsByModule(a)?.keys() ?? []).forEach(b => {
            //           console.log('^^^^^^^^^^^^^^^^^^^', b)
            //         })
            //       })
            //     })
            //   })
            // })

            // module.dependencies.forEach(dep => {
            //   // console.log('ooooooooo')
            //   // console.log(compilation.moduleGraph.getOrigin(dep)?._source)
            //   console.log(compilation.moduleGraph.getProfile(module))

            // })
            // modulex = module
          }

          // console.log(map.values())
        });
        console.log('==================end optimizeChunks================== ') 
      })
    })
  }
}

module.exports = ApiCallPlugin
