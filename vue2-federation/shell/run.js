
const acorn = require('acorn')
const path = require('path')
const fs = require('fs')

const config = require('./webpack.config.js')
const webpack = require('webpack')


// const webpackConfig = config({ env: 'qa' })
// console.log(webpackConfig)

const compiler = webpack(config)

compiler.run((err, stats) => {
  console.log(err)
  // console.log(stats)

  compiler.close((closeErr) => {
    console.log(closeErr)
  })
})

// new Promise((resolve, reject) => {
//   compiler.run((err, res) => {
//     if (err) {
//       return reject(err)
//     }
//     resolve(res)
//   })
// }).then(x => {
//   console.log(x)
// })

// const watching = compiler.watch(
//   {
//     // 示例
//     aggregateTimeout: 300,
//     poll: undefined
//   },
//   (err, stats) => {
//     // 这里打印 watch/build 结果...
//     console.log(stats)
//   }
// )

