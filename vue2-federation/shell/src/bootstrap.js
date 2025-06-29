import Vue from 'vue'
import App from './App.vue'
import router from './router'


// import Editor from 'binance/components/editor'
// Vue.component('Editor', Editor)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')