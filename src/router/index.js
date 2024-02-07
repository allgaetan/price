import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThemesView from '../views/ThemesView.vue'
import MoviesView from '../views/MoviesView.vue'
import ContactView from '../views/ContactView.vue'
import Movie from '../components/Movie.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'fade' }
    },
    {
      path: '/themes',
      name: 'themes',
      component: ThemesView,
      meta: { transition: 'fade' }
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: MoviesView,
      meta: { transition: 'fade' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { transition: 'fade' }
    },
    {
      path: '/movie/:movieID',
      name: 'Movie',
      component: Movie,
      props: true,
      meta: { transition: 'slide' }
    }
  ]
})

export default router
