<template>
  <div class="fixed bottom-0 grid h-16 w-full grid-cols-5 rounded-t-xl bg-white">
    <div v-for="item in firstItems" :key="item.label" class="flex flex-col items-center justify-center">
      <RouterLink :to="item.route" class="flex flex-col text-gray-400" active-class="!text-blue-500">
        <UiIcon :icon-name="item.icon" />
        <UiTypo level="6" class="mt-1">{{ item.label }}</UiTypo>
      </RouterLink>
    </div>
    <div class="relative bottom-4 flex justify-center">
      <button class="h-16 w-16 rounded-full border-4 border-white bg-blue-500">
        <UiIcon icon-name="faPlus" class="text-white" size="xl" />
      </button>
    </div>
    <div v-for="item in lastItems" :key="item.label" class="flex flex-col items-center justify-center">
      <RouterLink :to="item.route" class="flex flex-col text-gray-400" active-class="!text-blue-500">
        <UiIcon :icon-name="item.icon" />
        <UiTypo level="6" class="mt-1">{{ item.label }}</UiTypo>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import { UiIcon, UiTypo } from '@/shared/ui';

interface FooterItems {
  label: string;
  icon: string;
  route: RouteLocationNormalized;
}

const props = defineProps<{
  items: FooterItems[];
}>();

const firstItems = computed(() => {
  return props.items.slice(0, 2);
});

const lastItems = computed(() => {
  return props.items.slice(2, 4);
});
</script>
