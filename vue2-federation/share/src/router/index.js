import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('shell/views/profile')
  },
  {
    path: '/user',
    component: () => import('shell/views/user')
  },
  {
    path: '/profile',
    component: () => import('shell/views/profile')
  }
] 

const router = new VueRouter({
  routes
})

export default router
