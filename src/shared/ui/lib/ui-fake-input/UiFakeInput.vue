<template>
  <button type="button" class="flex w-full flex-col text-left" @click="$emit('click')">
    <UiTypo v-if="label" class="mb-1 block text-sm font-medium leading-5 text-slate-600">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </UiTypo>
    <div class="flex w-full rounded-lg shadow-sm ring-1 ring-inset" :class="[sizeStyle, ringColor]">
      <UiTypo
        class="overflow-hidden overflow-ellipsis text-nowrap leading-5"
        :class="value ? 'text-slate-700' : 'text-slate-400'"
      >
        <slot :value="value">
          <template v-if="!!placeholder && !value">{{ placeholder }}</template>
          <template v-if="!!value">{{ value }}</template>
        </slot>
      </UiTypo>
    </div>
    <UiTypo v-if="hint && !errorMessage" level="5" class="mt-1 block text-sm leading-5 text-slate-500">
      {{ hint }}
    </UiTypo>
    <UiTypo v-if="errorMessage" level="5" class="mt-1 block text-sm leading-5 text-red-500">
      {{ errorMessage }}
    </UiTypo>
  </button>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed } from 'vue';
import { UiTypo } from '../ui-typo';

const props = withDefaults(
  defineProps<{
    label?: string;
    required?: boolean;
    placeholder?: string;
    name?: string;
    hint?: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    label: '',
    required: false,
    name: '',
    placeholder: '',
    hint: '',
    size: 'medium',
  }
);

defineEmits<{
  (e: 'click'): void;
}>();

const { value, errorMessage } = useField<string>(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

const sizeStyle = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'h-8 px-2.5 py-1.5 text-sm';
    case 'medium':
      return 'h-9 px-3 py-2';
    case 'large':
      return 'h-10 px-3.5 py-2.5';
    default:
      return '';
  }
});

const ringColor = computed(() => {
  return errorMessage.value ? 'ring-red-500 dark:ring-red-600' : 'ring-gray-300 dark:ring-slate-600';
});
</script>
