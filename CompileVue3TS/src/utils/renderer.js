import { createApp } from 'vue'
import TestCount from '@/components/test.vue'

export default function render(ele) {
//   const routes = [
//     { path: '/demo', component: Home },
//     { path: '/demo/counter', component: Counter }
//   ]

//   const router = createRouter({
//     history: createWebHashHistory(),
//     routes
//   })

  const app = createApp(TestCount)

//   app.use(router)

  app.mount(ele)
}

