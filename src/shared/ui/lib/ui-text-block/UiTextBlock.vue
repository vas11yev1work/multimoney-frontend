<template>
  <div class="flex flex-col">
    <UiTypo level="5" class="font-medium text-slate-500">{{ title }}</UiTypo>
    <UiTypo>{{ text }}</UiTypo>
  </div>
</template>

<script setup lang="ts">
import { UiTypo } from '../ui-typo';

defineProps<{
  text: string;
  title: string;
}>();
</script>
