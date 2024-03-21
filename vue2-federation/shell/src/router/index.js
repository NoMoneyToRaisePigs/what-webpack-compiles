import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/profile')
  },
  {
    path: '/user',
    component: () => import('@/views/user')
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/index.vue')
  }
] 

const router = new VueRouter({
  routes
})

export default router
