<template>
  <button
    type="button"
    class="h-8 w-8 rounded-xl disabled:line-through disabled:opacity-30"
    :class="{ 'text-orange-500': isWeekend, 'opacity-30': !isCurrentMonth, 'bg-blue-500 !text-white': isSelectedDate }"
    :disabled="disabled"
    @click="$emit('select-date', day)"
  >
    <UiTypo class="font-semibold">{{ day }}</UiTypo>
  </button>
</template>

<script setup lang="ts">
import { UiTypo } from '@/shared/ui';

defineProps<{
  isWeekend: boolean;
  disabled: boolean;
  isCurrentMonth: boolean;
  isSelectedDate: boolean;
  day: number;
}>();

defineEmits<{
  (e: 'select-date', day: number): void;
}>();
</script>
