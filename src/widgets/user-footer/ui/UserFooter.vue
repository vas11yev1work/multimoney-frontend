<template>
  <div class="fixed bottom-0 grid h-16 w-full grid-cols-4 rounded-t-xl bg-white">
    <div v-for="item in items" :key="item.label" class="flex flex-col items-center justify-center">
      <RouterLink :to="item.route" class="flex flex-col text-gray-400" active-class="!text-blue-500">
        <UiIcon :icon-name="item.icon" />
        <UiTypo level="6" class="mt-1">{{ item.label }}</UiTypo>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router';
import { UiIcon, UiTypo } from '@/shared/ui';

interface FooterItems {
  label: string;
  icon: string;
  route: RouteLocationNormalized;
}

defineProps<{
  items: FooterItems[];
}>();
</script>
