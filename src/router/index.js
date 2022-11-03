import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('../views/Music.vue')
    },
    {
      path: '/listen',
      name: 'ListenOne',
      component: () => import('../views/ListenOne.vue')
    },
    {
      path: '/dialogOne',
      name: 'dialogOne',
      component: () => import('../views/DialogEveryDay.vue')
    },
  ]
})

export default router
