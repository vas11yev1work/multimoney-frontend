<template>
  <button
    class="h-10 w-10 min-w-10 select-none rounded-xl bg-gray-200 transition active:scale-90"
    ontouchstart
    @click="showModal = true"
  >
    <UiIcon icon-name="faPlus" />
  </button>
  <UiModal v-model="showModal" title="Добавить счет">
    <slot />
  </UiModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiIcon, UiModal } from '@/shared/ui';

const showModal = ref(false);
</script>
