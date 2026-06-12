import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import NewsView from "@/views/NewsView.vue";
import AboutView from "@/views/AboutView.vue";
import LocationsView from "@/views/LocationsView.vue";
import CoursesView from "@/views/CoursesView.vue";
import CourseDetailView from "@/views/CourseDetailView.vue";
import Test from "@/views/Test.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/locations",
      name: "locations",
      component: LocationsView,
    },
    {
      path: "/courses",
      name: "courses",
      component: CoursesView,
    },
    {
      path: "/courses/:id",
      name: "course-detail",
      component: CourseDetailView,
    },
    {
      path:"/test",
      name:"test",
      component: Test
    }
  ],
});

export default router;