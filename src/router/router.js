import { createRouter, createWebHistory } from "vue-router";
import homePage from '@/components/pages/homePage.vue';
import page404 from '@/components/pages/page404.vue';
import loginPage from '@/components/pages/loginPage.vue';
import progressPage from '@/components/pages/progressPage.vue';
import profilePage from '@/components/pages/profilePage';
import tasksPage from '@/components/pages/tasks/tasksPage.vue';
import ospfPage from '@/components/pages/tasks/ospfPage.vue';
import stpPage from '@/components/pages/tasks/stpPage.vue';
import ripPage from "@/components/pages/tasks/ripPage.vue";

import store from "@/store/index.js";

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/tasks',
    component: tasksPage,
  },
  {
    path: '/tasks/ospf',
    component: ospfPage,
  },
  {
    path: '/tasks/stp',
    component: stpPage,
  },
  {
    path: '/tasks/rip',
    component: ripPage,
  },
  {
    path: '/profile',
    component: profilePage,
  },
  {
    path: '/progress',
    component: progressPage,
  },
  {
    path: '/404',
    component: page404,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  if (!store.state.auth.cookie && !['/', '/404', '/login'].includes(to.path)) {
    return { path: '/login' };
  }
});

export default router