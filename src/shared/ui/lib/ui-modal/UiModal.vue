<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed bottom-0 left-0 right-0 top-0 z-40 bg-slate-700 opacity-90"
      @click="$emit('update:model-value', false)"
    />
  </Transition>
  <Transition name="slide">
    <div
      v-if="modelValue"
      ref="modalInstance"
      class="fixed bottom-0 left-0 right-0 z-50 max-h-[90%] overflow-y-auto rounded-t-xl bg-white"
      @scroll="onScroll"
    >
      <div
        class="sticky top-0 z-10 flex items-center justify-between bg-white p-4"
        :class="scrollTop > 0 ? 'border-b border-gray-200' : ''"
      >
        <UiTypo class="text-lg font-semibold">{{ title }}</UiTypo>
        <div class="flex gap-2">
          <div class="flex gap-2">
            <slot name="additional-icons" />
          </div>
          <button type="button" class="h-8 w-8 text-slate-400" @click="$emit('update:model-value', false)">
            <UiIcon icon-name="faTimes" size="lg" />
          </button>
        </div>
      </div>
      <div :class="$style.padding">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { UiIcon } from '../ui-icon';
import { UiTypo } from '../ui-typo';

const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const scrollTop = ref(0);
const modalInstance = ref<HTMLElement | null>(null);

function onScroll(e: Event) {
  scrollTop.value = (e.target as HTMLElement)?.scrollTop ?? 0;
}

watch(
  () => props.modelValue,
  async v => {
    await nextTick();
    if (modalInstance.value && v) {
      scrollTop.value = modalInstance.value.scrollTop ?? 0;
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s;
}

.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>

<style module>
.padding {
  padding: 0 16px 16px 16px;
  padding: 0 16px calc(env(safe-area-inset-bottom, 0) + 16px) 16px;
}
</style>
