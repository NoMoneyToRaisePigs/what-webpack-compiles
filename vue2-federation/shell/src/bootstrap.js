import Vue from 'vue'

import App from './App.vue'
import router from 'share/router'

import { myExport } from './test-console'
import Editor from 'binance/components/editor'

console.log(myExport)
Vue.component('Editor', Editor)
Vue.component()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')