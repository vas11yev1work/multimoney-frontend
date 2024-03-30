<template>
  <main class="pb-20">
    <RouterView />
  </main>
  <UserFooter :items="footerItems" />
</template>

<script setup lang="ts">
import { UserFooter } from '@/widgets/user-footer';

const footerItems = [
  {
    label: 'Главная',
    icon: 'faHome',
    route: { name: 'HomePage' },
  },
  {
    label: 'Статистика',
    icon: 'faChartSimple',
    route: { name: 'HomePage' },
  },
  {
    label: 'История',
    icon: 'faClock',
    route: { name: 'HomePage' },
  },
  {
    label: 'Настройки',
    icon: 'faGear',
    route: { name: 'HomePage' },
  },
];
</script>
