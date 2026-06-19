import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NewsView from '@/views/NewsView.vue'
import AboutView from '@/views/AboutView.vue'
import LocationsView from '@/views/LocationsView.vue'
import CoursesView from '@/views/CoursesView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import NewsDetailView from '@/views/NewsDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, top: 80 };
    }
    if (to.path === from.path) {
      return false;
    }
    const key = `scrollY_${to.name}`;
    const savedY = sessionStorage.getItem(key);
    if (savedY !== null) {
      sessionStorage.removeItem(key);
      return { top: Number(savedY) };
    }
    return { top: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: NewsDetailView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },  
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {
      path: '/courses/:id',
      name: 'course-detail',
      component: CourseDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})


export default router;
