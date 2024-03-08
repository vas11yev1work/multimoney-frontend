<template>
  <div class="animate-spin rounded-full border-2 border-t-transparent" :class="[border, sizeStyle]" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'white' | 'black';
    size?: 'small' | 'large';
  }>(),
  {
    color: 'primary',
    size: 'small',
  }
);

const sizeStyle = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-5 w-5';
    case 'large':
      return 'h-8 w-8';
    default:
      return '';
  }
});

const border = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'border-blue-500';
    case 'white':
      return 'border-white';
    case 'black':
      return 'border-slate-700';
    default:
      return '';
  }
});
</script>
