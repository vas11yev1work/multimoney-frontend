<template>
  <div class="root">
    <div v-for="row in rows" :key="row" class="skeleton" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    height?: string;
    width?: string;
    radius?: string;
    rows?: number;
    gap?: string;
    mode?: 'light' | 'dark';
  }>(),
  {
    height: '24px',
    width: '100%',
    radius: '4px',
    rows: 1,
    gap: '1rem',
    mode: 'light',
  }
);

const lightColor = computed(() => (props.mode === 'light' ? '#f1f5f9' : '#e2e8f0'));
const darkColor = computed(() => (props.mode === 'light' ? '#e2e8f0' : '#cbd5e1'));
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
}

.skeleton {
  animation: skeleton-loading 0.8s linear infinite alternate;
  border-radius: v-bind(radius);
  height: v-bind(height);
  width: v-bind(width);

  &:last-child {
    margin-bottom: 0 !important;
  }
}

@keyframes skeleton-loading {
  0% {
    background-color: v-bind(lightColor);
  }
  100% {
    background-color: v-bind(darkColor);
  }
}
</style>
