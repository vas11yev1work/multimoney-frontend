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
    ],
  },
];
