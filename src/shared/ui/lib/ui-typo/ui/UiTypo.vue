<template>
  <component :is="currentTag" :class="currentFontSize">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'heading' | 'text';
    level?: '1' | '2' | '3' | '4' | '5' | '6';
  }>(),
  {
    type: 'text',
    level: '4',
  }
);

const headingFontSize = {
  '1': 'text-4xl',
  '2': 'text-3xl',
  '3': 'text-2xl',
  '4': 'text-xl',
  '5': 'text-lg',
  '6': 'text-base',
};

const textFontSize = {
  '1': 'text-2xl',
  '2': 'text-xl',
  '3': 'text-lg',
  '4': 'text-base',
  '5': 'text-sm',
  '6': 'text-xs',
};

const currentFontSize = computed(() => {
  return props.type === 'heading' ? headingFontSize[props.level] : textFontSize[props.level];
});

const currentTag = computed(() => {
  return props.type === 'heading' ? `h${props.level}` : 'p';
});
</script>
