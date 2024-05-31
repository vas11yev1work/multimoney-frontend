<template>
  <div class="mb-2 flex w-full select-none px-2.5">
    <button ontouchstart type="button" class="h-8 w-8 rounded-xl active:bg-slate-200" @click="changeMonth('prev')">
      <UiIcon icon-name="faAngleLeft" />
    </button>
    <button type="button" class="flex h-8 flex-grow items-center justify-center">
      <UiTypo class="font-semibold">{{ visibleMonthText }} {{ visibleYearText }}</UiTypo>
    </button>
    <button ontouchstart type="button" class="h-8 w-8 rounded-xl active:bg-slate-200" @click="changeMonth('next')">
      <UiIcon icon-name="faAngleRight" />
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { capitalize } from '@/shared/lib';
import { UiIcon } from '../ui-icon';
import { UiTypo } from '../ui-typo';

const props = defineProps<{
  modelValue: dayjs.Dayjs;
  minDate: dayjs.Dayjs;
  maxDate: dayjs.Dayjs;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: dayjs.Dayjs): void;
}>();

const visibleMonthText = computed(() => capitalize(props.modelValue.format('MMMM')));
const visibleYearText = computed(() => props.modelValue.format('YYYY'));

function checkAvailableView(date: dayjs.Dayjs) {
  return date.isBetween(props.minDate, props.maxDate, 'month', '[]');
}

function changeMonth(direction: 'prev' | 'next') {
  const newDate = props.modelValue.add(direction === 'prev' ? -1 : 1, 'month');
  if (!checkAvailableView(newDate)) {
    return;
  }
  emit('update:model-value', newDate);
}
</script>
