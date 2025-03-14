import Vue from 'vue'

import App from './App.vue'

import VueRouter from 'vue-router'

// import requestWrapper from './utils/request'
// import {xroutes} from './utils/request'
import {xxx} from './utils/request'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('./components/hello.vue') },
  { path: '/increase', component: () => import('./components/increase-count.vue') },
  { path: '/hello', component: () => import('./components/hello.vue') }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

window.__GLOBAL_ROUTER__ = router


// const RouteSnapshotPlugin = {
//   install(Vue) {
//     Vue.mixin({
//       mounted() {
//         // 记录组件挂载时的路由信息
//         console.log('snapshot request wrapper', __GLOBAL_ROUTER__.currentRoute.path)
//         // this.routeSnapshot = __GLOBAL_ROUTER__.currentRoute.path
//         requestWrapper(__GLOBAL_ROUTER__.currentRoute.path)
//         // 
//         // console.log('snapshotted:', this.routeSnapshot)
//       }
//     })
//   }
// }

// Vue.use(RouteSnapshotPlugin)

// const RouteSnapshotPlugin = {
//   install(Vue) {
//     Vue.mixin({
//       data() {
//         return {
//           routeSnapshot: ''
//         }
//       },
//       mounted() {
//         // 记录组件挂载时的路由信息

//         this.routeSnapshot = __GLOBAL_ROUTER__.currentRoute.path
//         console.log('snapshotted:', this.routeSnapshot)
//       }
//     })

//     Vue.prototype.$getRouteSnapshot = function() {
//       // 获取当前组件挂载时的路由快照
//       const vm = this
//       console.log('getting snapshot:', vm.routeSnapshot)
//       return vm.routeSnapshot
//     }
//   }
// }

// Vue.use(RouteSnapshotPlugin)


const RouteSnapshotPlugin = {
  install(Vue) {
    Vue.mixin({
      mounted() {

      }
    })
  }
}

Vue.use(RouteSnapshotPlugin)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

