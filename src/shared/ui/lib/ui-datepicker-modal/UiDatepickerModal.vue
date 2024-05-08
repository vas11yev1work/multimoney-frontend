<template>
  <UiModal v-model="showValue" :title="title">
    <DatePicker
      v-model="value"
      transparent
      borderless
      expanded
      :rows="2"
      v-bind="$attrs"
      @dayclick="$emit('update:show', false)"
    />
  </UiModal>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';
import { UiModal } from '../ui-modal';

const props = withDefaults(
  defineProps<{
    show: boolean;
    modelValue?: string | Date | null | number;
    title?: string;
  }>(),
  {
    title: 'Выберите дату',
  }
);

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'update:model-value', value: string): void;
}>();

const showValue = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
});

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:model-value', value),
});
</script>
