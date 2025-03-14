const fs = require('fs')
// Used to list all the api calls in admin-ui, run on local only

class Visitor {
    constructor() {
      this.definedApis = []
      this.requsetSource = ['@/utils/request']
      this.hasImportedRequestSource = false
      this.importedRequestSpecifiers = []
    }
  
    visitNode(node) {
      switch (node.type) {
        case 'ExportDefaultDeclaration':
        case 'ExportNamedDeclaration':
          this.visitDeclartion(node)
          break
        case 'ImportDeclaration':
            this.visitImportDeclaration(node)
        case 'Program':
          this.visitProgram(node)
          break
        case 'FunctionDeclaration':
            this.visitFunctionDeclaration(node)
        case 'VariableDeclaration':
          this.visitVariableDeclaration(node)
          break
        case 'VariableDeclarator':
          this.visitVariableDeclarator(node)
          break
        case 'Identifier':
          this.visitIdentifier(node)
          break
        case 'Literal':
          this.visitLiteral(node)
          break
        case 'ArrayExpression':
          this.visitArrayExpression(node)
          break
        case 'ObjectExpression':
          this.visitObjectExpression(node)
          break
        case 'Property':
          this.visitProperty(node)
          break
        case 'BlockStatement':
            this.visitBlockStatement(node)
        case 'ReturnStatement':
            this.visitReturnStatement(node)
        case 'CallExpression':
            this.visitCallExpression(node)
        default:
          break
      }
    }
  
    visitNode(node) {  for (const n of [node]) this.visitNode(n) }
    visitNodes(nodes) { for (const node of nodes) this.visitNode(node) }
    visitProgram(node) { this.visitNodes(node.body) }
    visitProperty(node) {
    //   if (node.key && node.key.name === 'component') {
    //     if (node.value && node.value.type === 'ArrowFunctionExpression') {
    //       // console.log(node.value.type, node.value.body.source.value)
    //       this.definedComponents.push(node.value.body.source.value)
    //     }
    //   }
      this.visitNode(node.key)
      this.visitNode(node.value)
    }
    visitArrayExpression(node) { this.visitNodes(node.elements) }
    visitObjectExpression(node) { this.visitNodes(node.properties) }
    visitDeclartion(node) { 
        if(node.declaration) {
            this.visitNode(node.declaration)
        } else {
            if(node.specifiers && node.specifiers.length) {

            }
        }        
    }
    visitVariableDeclaration(node) {
      if (!node) return
      this.visitNodes(node.declarations ?? node.properties ?? node.elements ?? [])
    }
    visitVariableDeclarator(node) {
      this.visitNode(node.id)
      this.visitNode(node.init)
    }
    visitIdentifier(node) {}
    visitImportDeclaration(node) {
        console.log('visitImportDeclaration:    ', node)
        if(requsetSource.includes(node.source.value?.trim())) {
            this.hasImportedRequestSource = true
            this.importedRequestSpecifiers.push(...node.specifiers?.map(x => x.local?.name ?? ''))
        }
    }
    visitFunctionDeclaration(node) {
        this.visitNode(node.body)
    }
    visitBlockStatement(node) {
        this.visitNodes(node.body)
    }
    visitReturnStatement(node) {
        this.visitNode(node.argument)
    }
    visitCallExpression(node) {
        // have your logic here
        if(importedRequestSpecifiers.includes(node.callee)) {
            // collectArguments
        } else {
            return
        }
    }
    visitLiteral(node) {}
  }

class ApiCallPlugin {
  constructor(options) {
    this.options = options || {}
    this.logFilePath = this.options.logFilePath || 'logs/output.log'
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('ApiCallPluginV2', (normalModuleFactory) => {


      normalModuleFactory.hooks.module.tap('moduleNamePlugin', (module) => {
        // console.log('module:   ', module.resource)

        // if(!module.parser.hooks.program.interceptors.length) {
        //     module.parser.hooks.program.intercept({
        //         context: true,
        //         tap: (context, tapInfo) => {
        //             // tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
        //             // console.log(`${tapInfo.name} is doing it's job`);
            
        //             // `context` starts as an empty object if at least one plugin uses `context: true`.
        //             // If no plugins use `context: true`, then `context` is undefined.
        //             if (context) {
        //                 // Arbitrary properties can be added to `context`, which plugins can then access.
        //                 context.moduleSource = context.moduleSource ? context.moduleSource : []
        //                 context.moduleSource.push(module.resource)
        //             }
        //         }
        //     })
        // }

        // if(module.resource.endsWith('test-console.js')) {
        //     console.log(module.parser.hooks)
        // }
      })


      normalModuleFactory.hooks.parser.for('javascript/auto').tap('js analysis', (parser) => {
        
        parser.hooks.program.tap({name: 'programmePlugin'}, (ast, comments) => {
            if(parser.state.module.resource.endsWith('api.js')) {
                console.log('parser: --- ', parser.state.module.resource)
                console.log('visitor prepared')
                
                // if(context && context.moduleSource) {
                //     console.log('programme resource:', context.moduleSource)
                //     console.log(ast)
                //     console.log(comments)
                // }else {
                //     console.log(comments)
                // }  

                // console.log(JSON.stringify(ast))
                
                const visitor  = new Visitor(ast)
                visitor.visitNode(ast)
            }
        })


        // const specifierMap = {
        //     '@/utils/request': Symbol("request"),
        //     'share/utils/raw-request': Symbol("raw-request"),
        //     'share/utils/http-request': Symbol("http-request"),
        // }



        // parser.hooks.importSpecifier.tap('HarmonyImportDependencyParserPlugin',
        //   (statement, source, id, name) => { 
        //     if(specifierMap[source]) {
        //       parser.tagVariable(name, specifierMap[source], { 
        //         name, 
        //         source, 
        //         ids: id === null ? [] : [id], 
        //         sourceOrder: parser.state.lastHarmonyImportOrder, 
        //         await: statement.await 
        //       }); 
        //     } 

        //     return true
        //   } 
        // ); 


        // Object.values(specifierMap).forEach((specifier) => {
        //     parser.hooks.call.for(specifier).tap('call', (expression) => {
        //         const params = expression.arguments?.[0]?.properties ?? []
        //         const url = params.find((p) => p.key.name === 'url')?.value?.value

        //         if(url) {
        //             console.log('url:   ', url)
        //         }
        //         // console.log(expression)
        //         // console.log(expression.arguments[0].properties)
        //       });
        // })


      })


    })
  }
}

module.exports = ApiCallPlugin
