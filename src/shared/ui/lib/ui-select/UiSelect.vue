<template>
  <label class="w-full">
    <div v-if="label || $slots.append" class="mb-1 flex w-full justify-between">
      <UiTypo class="block text-sm font-medium leading-5 text-slate-600">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </UiTypo>
      <slot name="append" />
    </div>
    <div class="relative w-full">
      <div v-if="$slots.icon" :class="iconSize" class="pointer-events-none absolute flex items-center justify-center">
        <div class="h-5 w-5 text-slate-500">
          <slot name="icon" />
        </div>
      </div>
      <select
        :id="name"
        v-model="customValue"
        :name="name"
        :class="[$style.base, sizeStyle, ringColor]"
        class="bg-white text-slate-700"
        v-bind="$attrs"
        v-on="validationListeners"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
      </select>
    </div>
    <UiTypo v-if="hint && !errorMessage" level="5" class="mt-1 block text-sm leading-5 text-slate-500">
      {{ hint }}
    </UiTypo>
    <UiTypo v-if="errorMessage" level="5" class="mt-1 block text-sm leading-5 text-red-500">
      {{ errorMessage }}
    </UiTypo>
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, customRef, useSlots } from 'vue';
import { UiTypo } from '@/shared/ui';

interface Option {
  value: string;
  text: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    name?: string;
    hint?: string;
    size?: 'small' | 'medium' | 'large';
    autocomplete?: string;
    required?: boolean;
    options: Option[];
  }>(),
  {
    modelValue: undefined,
    name: '',
    label: '',
    hint: '',
    size: 'medium',
    autocomplete: 'on',
    required: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void;
}>();

const { value, errorMessage, handleBlur, handleChange } = useField<string>(() => props.name, undefined, {
  validateOnValueUpdate: false,
});
const slots = useSlots();

const customValue = customRef<string>((track, trigger) => ({
  get() {
    track();
    if (typeof props.modelValue === 'undefined') {
      return value.value;
    }
    return props.modelValue;
  },
  set(newValue: string) {
    trigger();
    if (typeof props.modelValue === 'undefined') {
      value.value = newValue;
      return;
    }
    emit('update:modelValue', newValue);
  },
}));

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value),
};

const sizeStyle = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return (slots.icon ? 'pl-8 pr-2.5' : 'px-2.5') + ' py-1.5 text-sm';
    case 'medium':
      return (slots.icon ? 'pl-9 pr-3' : 'px-3') + ' py-2';
    case 'large':
      return (slots.icon ? 'pl-10 pr-3.5' : 'px-3.5') + ' py-2.5';
    default:
      return '';
  }
});

const iconSize = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'h-8 w-8';
    case 'medium':
      return 'h-9 w-9';
    case 'large':
      return 'h-10 w-10';
    default:
      return '';
  }
});

const ringColor = computed(() => {
  return errorMessage.value
    ? 'ring-red-500 focus:ring-red-500 dark:ring-red-600'
    : 'ring-gray-300 focus:ring-blue-500 dark:ring-slate-600 dark:focus:ring-blue-500';
});
</script>

<style module>
.base {
  @apply block w-full appearance-none rounded-lg leading-5 placeholder-slate-400 shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2;
}
</style>
