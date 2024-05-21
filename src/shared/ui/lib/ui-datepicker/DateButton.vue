<template>
  <div class="relative flex h-10 items-center justify-center">
    <div v-show="isRangeDate && !isFirstDateOfRange" class="absolute left-0 h-8 w-1/2 bg-blue-200 opacity-50" />
    <div v-show="isRangeDate && !isLastDateOfRange" class="absolute right-0 h-8 w-1/2 bg-blue-200 opacity-50" />
    <button
      type="button"
      class="relative h-8 w-8 min-w-8 rounded-xl disabled:line-through disabled:opacity-30"
      :class="{
        'text-orange-500': isWeekend,
        'opacity-30': !isCurrentMonth && !isSelectedDate,
        'bg-blue-500 !text-white': isSelectedDate,
      }"
      :disabled="disabled"
      @click="$emit('select-date', day)"
    >
      <UiTypo class="font-semibold">{{ day }}</UiTypo>
    </button>
  </div>
</template>

<script setup lang="ts">
import { UiTypo } from '@/shared/ui';

defineProps<{
  isWeekend: boolean;
  disabled: boolean;
  isCurrentMonth: boolean;
  isSelectedDate: boolean;
  isRangeDate: boolean;
  isFirstDateOfRange: boolean;
  isLastDateOfRange: boolean;
  day: number;
}>();

defineEmits<{
  (e: 'select-date', day: number): void;
}>();
</script>
