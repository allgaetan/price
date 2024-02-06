import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThemesView from '../views/ThemesView.vue'
import MoviesView from '../views/MoviesView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/themes',
      name: 'themes',
      component: ThemesView
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: MoviesView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router
