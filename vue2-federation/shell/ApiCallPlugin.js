const fs = require('fs')
// Used to list all the api calls in admin-ui, run on local only


class ApiCallPlugin {
  constructor(options) {
    this.options = options || {}
    this.logFilePath = this.options.logFilePath || 'logs/output.log'
    this.requestFilePaths = ['src/utils/http-request.ts', 'src/utils/raw-request.js', 'src/utils/request.ts']
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('ast anylisis', (normalModuleFactory) => {
      console.log('==================Start AST================== ')
      normalModuleFactory.hooks.module.tap('moduleFactory', (module, createData)=> {

        // console.log(module.resource)

        // if(module.resource && module.resource.endsWith('profile/index.vue')) {
        //   console.log(module)
        // }
      })

      normalModuleFactory.hooks.module.tap('get source', (module, createData, resolveData) => {
        console.log(module.resourceResolveData?.__innerRequest)
      })

      normalModuleFactory.hooks.parser.for('javascript/auto').tap('js analysis', (parser) => {
        // parser.hooks.import.tap('ApiCallPlugin', (statement, source) => {

        //   console.log('------>',source, statement.specifiers[0].local)
        // })

        // parser.hooks.program.tap('astPlugin', (ast,comments) => {
        //   console.log('------>', 'AST', comments)
        // })

        // parser.hooks.call.for('request').tap('requestPlubin', (expression) => {
        //   console.log(expression)
        //   console.log(expression.arguments[0].properties)
        // });

        const harmonySpecifierTag = Symbol("request");

        parser.hooks.importSpecifier.tap( 
          "HarmonyImportDependencyParserPlugin", 
          (statement, source, id, name) => { 
            // console.log('   import', name)
            if(name === 'request' && source === '@/utils/request') {
              // console.log('------>', source)

              const ids = id === null ? [] : [id]; 
              parser.tagVariable(name, harmonySpecifierTag, { 
                name, 
                source, 
                ids, 
                sourceOrder: parser.state.lastHarmonyImportOrder, 
                await: statement.await 
              }); 
            } 

            // console.log(statement)

            return true
            // const ids = id === null ? [] : [id]; 
            // parser.tagVariable(name, harmonySpecifierTag, { 
            //   name, 
            //   source, 
            //   ids, 
            //   sourceOrder: parser.state.lastHarmonyImportOrder, 
            //   await: statement.await 
            // }); 
            // return true; 
          } 
        ); 

        // parser.hooks.expression 
        // .for(harmonySpecifierTag) 
        // .tap("HarmonyImportDependencyParserPlugin", expr => { 
        //   console.log(expr)
        // })

        parser.hooks.call.for(harmonySpecifierTag).tap('call', (expression) => {
          // console.log(expression)
          const propKey = expression.arguments[0].properties.filter(x => x.key)
          // console.log(propKey)
          const urlProp = propKey.filter(x => x.key.name === 'url')
          console.log(urlProp[0]?.value?.value)
          // console.log(expression.arguments[0].properties)
        });

        // parser.hooks.program.tap('astPlugin', (ast) => {
        //   console.log('------>','programm')
        // })

        // parser.hooks.callMemberChain.for(harmonySpecifierTag).tap('callRequest', (expression) => {
        //   // console.log(expression)
        //   console.log(expression.arguments[0].properties)
        // });

        // parser.hooks.call.for('request').tap('call', (expression) => {
        //   console.log(expression)
        //   console.log(expression.arguments[0].properties)
        // });

        // parser.hooks.callMemberChain.for('request').tap('callRequest', (expression) => {
        //   console.log(expression)
        //   console.log(expression.arguments[0].properties)
        // });

        // parser.hooks.evaluate.for('FunctionExpression').tap('expressPlugin', (expression) => {
        //   console.log(expression)
        // });
      })

      // normalModuleFactory.hooks.parser.for('asset').tap('js analysis', (parser) => {
      //   parser.hooks.import.tap('ApiCallPlugin', (_stmt, source) => {
      //     console.log('------>',source)
      //   })



      //   parser.hooks.call.for('request').tap('requestPlubin', (expression) => {
      //     console.log(expression)
      //     console.log(expression.arguments[0].properties)
      //   });
      // })
    })
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


      console.log('==================Start ApiCallPlugin================== ')

      compilation.hooks.afterChunks.tap('afterchunkPlugin', (chunks) => {
        // console.log(chunks)

        Array.from(chunks).forEach(x => {
          if(x.name === 'profile') {
            // console.log(x.getModules())
          }
        })

      })

      compilation.hooks.afterOptimizeDependencies.tap('chunkPlugin', (modules) => {
        console.log('==================Start optimizeChunks================== ')  
        // console.log(chunks)
        // console.log([...new Set(Array.from(compilation.moduleGraph.getOutcomingConnections(moduleTest)).map(x => x.originModule))])
        // console.log(moduleTest.dependencies)
        // console.log(compilation.moduleGraph.getOutgoingConnectionsByModule(moduleTest))
        modules.forEach(module => {
          // console.log(module)
          if(module.resource && module.resource.endsWith('profile/index.vue')) {
            // console.log(module.resource)
  
            // console.log(compilation.moduleGraph.getProfile(module))

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
  
        // console.log(compilation.chunkGraph)
        //console.log(compilation.findModule('/Users/terence/Documents/gf/my/what-webpack-compiles/vue2-federation/shell/node_modules/vue-loader/lib/index.js??vue-loader-options!/Users/terence/Documents/gf/my/what-webpack-compiles/vue2-federation/shell/src/views/profile/index.vue'))
        console.log('==================end optimizeChunks================== ') 
      })

      
      // compilation.hooks.succeedModule.tap({ 
      //   name: 'MergeRuntimeWithRemoteEntry', 
      // }, (module) => {
      //   if(module.resource && module.resource.endsWith('profile/index.vue')) {
      //   // if(module.resource && module.resource.endsWith('test-console.js')) {
      //     moduleTest = module
      //     // console.log([...new Set(module.dependencies)])
      //     module.dependencies.forEach(dep => {
      //       console.log(compilation.moduleGraph.getModule(module.dependencies[0]))
      //     })
          
      //     // console.log(module.dependencies)
      //     //console.log(module.dependencies.find(x => x.constructor.name === 'HarmonyImportSpecifierDependency' && x.directImport))
      //     // console.log(module)
      //     // compilation.codeGenerationResults.getSource(module)
      //   }
      // })

      // console.log(compilation.modules)
      // find requestFile modules
      // const requestFileModules = compilation.modules.filter((module) => {
      //   console.log(module.name, '---->', module.resource)

      //   return module.resource && (
      //     module.resource.endsWith() ||
      //   module.resource.endsWith(this.requestFilePaths[1]) ||
      //   module.resource.endsWith(this.requestFilePaths[2]))
      // })
      // console.log('********************************************************')
      // console.log(requestFileModules)
      // console.log('********************************************************')


      // let modulex


      // console.log(modulex)
      // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      // console.log(compilation.codeGenerationResults.getSource(modulex))
      
 
      // console.log(modulex)
      // console.log(modulex.originalSource().source())
      // console.log(modulex.identifier())

      // console.log(modulex.dependencies.filter(x => x.userRequest === '../../test-console'))
      // console.log(modulex.dependencies.filter(x => x.directImport).map(x => {
      //   // return x

      //   return {
      //     constructor: x.constructor.name,
      //     request: x.request,
      //     rawRequest: x.rawRequest,
      //     userRequest: x.userRequest,
      //   }
      //   // if(x.constructor.name === '') {

      //   // }

      //   // return null
      // }))

      

      // const targetModuleConnections = compilation.moduleGraph.getIncomingConnections(modulex)

      // // console.log(targetModuleConnections)

      // // for (const targetModuleConnection of targetModuleConnections.values()) {
      // //   if (targetModuleConnection.originModule) {
      // //     const orgModule = targetModuleConnection.originModule
      // //     console.log(targetModuleConnection)
      // //   }
      // // }

      // const targetModuleSet = new Set()
      // for (const targetModuleConnection of targetModuleConnections.values()) {
      //   if (targetModuleConnection.originModule?.resource) {
      //     targetModuleSet.add(targetModuleConnection.originModule)
      //   }
      // }

      //   for (const targetModule of targetModuleSet.values()) {
      //     const sourceCode = targetModule.originalSource().source()
      //     console.log('========================================================')
      //     console.log(sourceCode)
      //     console.log('========================================================')
      //   }
      

      console.log('==================End ApiCallPlugin================== ')
    })
  }
}

module.exports = ApiCallPlugin
