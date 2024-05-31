<template>
  <button
    :disabled="disabledState"
    :type="type"
    class="select-none transition active:scale-[.98]"
    :class="[$style.base, color, outline, sizeStyle, rounded ? 'rounded-full' : 'rounded-lg', block ? 'w-full' : '']"
    ontouchstart
    @click="$emit('click')"
  >
    <div v-if="$slots['left-icon'] && !loading" class="h-5 w-5" :class="$slots.default && 'mr-1.5'">
      <slot name="left-icon" />
    </div>
    <UiSpinner v-if="loading" :color="spinnerColor" class="mr-1.5" />
    <div class="h-5">
      <slot />
    </div>
    <div v-if="$slots['right-icon']" class="ml-1.5 h-5 w-5">
      <slot name="right-icon" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UiSpinner } from '../ui-spinner';

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'transparent' | 'soft';
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    rounded?: boolean;
  }>(),
  {
    size: 'medium',
    variant: 'primary',
    disabled: false,
    loading: false,
    block: false,
    rounded: false,
    type: 'button',
  }
);

defineEmits<{
  (e: 'click'): void;
}>();

const disabledState = computed<boolean>(() => {
  return props.disabled || props.loading;
});

const spinnerColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'white';
    case 'soft':
    case 'transparent':
      return 'primary';
    case 'secondary':
      return 'black';
    default:
      return 'white';
  }
});

const sizeStyle = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'py-1.5 px-2.5 text-sm';
    case 'medium':
      return 'py-2 px-3';
    case 'large':
      return 'py-2.5 px-3.5';
    default:
      return '';
  }
});

const color = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-500 active:bg-blue-600 text-white';
    case 'soft':
      return 'bg-blue-100 active:bg-blue-200/75 text-blue-700';
    case 'transparent':
      return 'bg-transparent active:bg-blue-50 text-blue-600';
    case 'secondary':
      return 'bg-white text-slate-700 ring-inset ring-1 ring-gray-300 ring-offset-0 active:bg-slate-50 shadow-sm';
    default:
      return '';
  }
});

const outline = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
    case 'soft':
      return 'focus-visible:outline outline-2 outline-offset-2 outline-blue-400';
    case 'transparent':
      return 'focus-visible:outline outline-2 outline-offset-0 outline-blue-400';
    case 'secondary':
      return 'focus-visible:outline outline-2 outline-offset-0 outline-stone-600';
    default:
      return '';
  }
});
</script>

<style module>
.base {
  -webkit-tap-highlight-color: transparent;
  @apply flex items-center justify-center whitespace-nowrap font-medium leading-5 disabled:cursor-not-allowed disabled:opacity-75;
}
</style>
