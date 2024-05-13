<template>
  <div :class="$style.footer" class="fixed bottom-0 grid w-full grid-cols-4 rounded-t-xl bg-white">
    <div v-for="item in items" :key="item.label" class="flex h-16 flex-col items-center justify-center">
      <RouterLink :to="{ name: item.route }" class="flex flex-col text-gray-400" active-class="!text-blue-500">
        <UiIcon :icon-name="item.icon" />
        <UiTypo level="6" class="mt-1">{{ item.label }}</UiTypo>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiIcon, UiTypo } from '@/shared/ui';
import { FooterItem } from '../model';

defineProps<{
  items: FooterItem[];
}>();
</script>

<style module>
.footer {
  padding-bottom: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>
