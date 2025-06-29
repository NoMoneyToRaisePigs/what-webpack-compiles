
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dependencies = require('./package.json').dependencies

const shared = {
  vue: {
    eager: true,
    singleton: true,
    requiredVersion: dependencies.vue
  },
  'vue-router': {
    eager: true,
    singleton: true,
    requiredVersion: dependencies['vue-router']
  },
}

module.exports = shared
