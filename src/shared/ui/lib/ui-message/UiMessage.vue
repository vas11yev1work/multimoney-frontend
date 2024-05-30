<template>
  <div class="max-w-max rounded-xl px-3 py-1" :class="plateStyle">
    <UiTypo :class="textColor" level="5">
      <slot />
    </UiTypo>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    variant?: 'accent' | 'secondary';
  }>(),
  {
    variant: 'accent',
  }
);

const plateStyle = computed(() => {
  return props.variant === 'accent' ? 'bg-blue-500 rounded-tl' : 'bg-gray-200 rounded-tr';
});

const textColor = computed(() => {
  return props.variant === 'accent' ? 'text-white' : 'text-slate-700';
});
</script>
