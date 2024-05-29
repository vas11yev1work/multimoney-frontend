import { RouteRecordRaw } from 'vue-router';

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('@/pages/main-layout'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/pages/home'),
      },
      {
        path: 'history',
        name: 'HistoryPage',
        component: () => import('@/pages/history'),
      },
    ],
  },
  {
    path: '/debug',
    name: 'DebugPage',
    component: () => import('@/pages/debug'),
  },
];
