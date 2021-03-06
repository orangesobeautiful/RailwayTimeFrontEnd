import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/TimeTableIndex.vue'),
      },
      {
        path: 'search',
        component: () => import('src/pages/TimeTableIndex.vue'),
      },
      { path: 'favorite', component: () => import('src/pages/Favorite.vue') },
      {
        path: 'history',
        component: () => import('src/pages/SearchHistory.vue'),
      },
      {
        path: 'about',
        component: () => import('src/pages/About.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
