<template>
  <div class="grid w-full rounded-lg bg-slate-100 p-1" :class="$style.tabsCount">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="flex h-8 w-full items-center justify-center rounded-md"
      :class="modelValue === tab.value ? 'bg-white shadow' : ''"
      @click="$emit('update:model-value', tab.value)"
    >
      <UiIcon v-if="tab.icon" :icon-name="tab.icon" class="mr-1.5" />
      <UiTypo level="5" class="font-semibold">{{ tab.label }}</UiTypo>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { UiIcon } from '../ui-icon';
import { UiTypo } from '../ui-typo';

interface TabItem {
  value: string;
  icon?: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    tabs?: TabItem[];
    modelValue: string | null;
  }>(),
  {
    tabs: () => [],
  }
);

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();

const tabsCount = computed(() => props.tabs.length);

onBeforeMount(() => {
  if (props.modelValue === null && props.tabs.length > 0) {
    emit('update:model-value', props.tabs[0].value);
  }
});
</script>

<style module>
.tabsCount {
  grid-template-columns: repeat(v-bind(tabsCount), 1fr);
}
</style>
