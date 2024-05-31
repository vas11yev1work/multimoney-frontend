<template>
  <button class="w-full rounded-xl bg-gray-200 p-2 transition active:scale-95" ontouchstart @click="showModal = true">
    <UiIcon size="lg" :icon-name="icon" class="text-blue-500" />
    <UiTypo class="mt-1 font-semibold" level="5">{{ title }}</UiTypo>
  </button>
  <UiModal v-model="showModal" :title="modalTitle">
    <slot />
  </UiModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiIcon, UiModal, UiTypo } from '@/shared/ui';

defineProps<{
  icon: string;
  title: string;
  modalTitle: string;
}>();

const showModal = ref(false);
</script>
