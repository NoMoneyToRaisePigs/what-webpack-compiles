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


      normalModuleFactory.hooks.module.tap('get source', (module, createData, resolveData) => {
        console.log(module.resourceResolveData?.__innerRequest)
      })
   
      console.log('==================End ApiCallPlugin================== ')
    })
  }
}

module.exports = ApiCallPlugin
