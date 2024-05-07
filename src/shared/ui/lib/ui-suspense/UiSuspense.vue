<template>
  <slot v-if="showContent" />
  <slot v-if="showLoading" name="loading" />
  <slot v-if="showError" name="error" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SharedData } from '@/shared/api';

const props = defineProps<{
  data: SharedData<unknown> | SharedData<unknown>[];
}>();

const showContent = computed(() => {
  if (Array.isArray(props.data)) {
    return props.data.every(item => !!item.data && item.loaded && !item.error);
  }
  return !!props.data.data && props.data.loaded && !props.data.error;
});

const showLoading = computed(() => {
  if (Array.isArray(props.data)) {
    return props.data.some(item => ((!item.data && !item.loaded) || item.loading) && !item.error);
  }
  return ((!props.data.data && !props.data.loaded) || props.data.loading) && !props.data.error;
});

const showError = computed(() => {
  if (Array.isArray(props.data)) {
    return props.data.some(item => item.error);
  }
  return props.data.error;
});
</script>
