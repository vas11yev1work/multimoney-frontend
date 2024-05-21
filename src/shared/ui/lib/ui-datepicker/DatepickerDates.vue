<template>
  <div class="grid grid-cols-7">
    <div v-for="weekday in WEEKDAYS_LIST" :key="weekday" class="flex h-8 items-center justify-center">
      <UiTypo level="5" class="font-medium text-slate-500">{{ weekday }}</UiTypo>
    </div>
    <DateButton
      v-for="day in prevMonthDays"
      :key="day"
      :disabled="!checkAvailableDate(day, -1)"
      :is-weekend="isWeekend(day, -1)"
      :day="day"
      :is-selected-date="isSelectedDate(day, -1)"
      :is-range-date="isRangeDate(day, -1)"
      :is-first-date-of-range="isFirstDateOfRange(day, -1)"
      :is-last-date-of-range="isLastDateOfRange(day, -1)"
      :is-current-month="false"
      @select-date="selectDate($event, -1)"
    />
    <DateButton
      v-for="day in days"
      :key="day"
      :disabled="!checkAvailableDate(day)"
      :is-weekend="isWeekend(day)"
      :day="day"
      :is-selected-date="isSelectedDate(day)"
      :is-range-date="isRangeDate(day)"
      :is-first-date-of-range="isFirstDateOfRange(day)"
      :is-last-date-of-range="isLastDateOfRange(day)"
      is-current-month
      @select-date="selectDate"
    />
    <DateButton
      v-for="day in nextMonthDays"
      :key="day"
      :disabled="!checkAvailableDate(day, 1)"
      :is-weekend="isWeekend(day, 1)"
      :day="day"
      :is-selected-date="isSelectedDate(day, 1)"
      :is-range-date="isRangeDate(day, 1)"
      :is-first-date-of-range="isFirstDateOfRange(day, 1)"
      :is-last-date-of-range="isLastDateOfRange(day, 1)"
      :is-current-month="false"
      @select-date="selectDate($event, 1)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { UiTypo } from '@/shared/ui';
import { WEEKDAYS_LIST } from './const';
import DateButton from './DateButton.vue';
import { DatepickerModel } from './types';

const props = defineProps<{
  modelValue?: DatepickerModel;
  visibleDate: dayjs.Dayjs;
  minDate: dayjs.Dayjs;
  maxDate: dayjs.Dayjs;
  isRange: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: DatepickerModel): void;
  (e: 'update:visible-date', value: dayjs.Dayjs): void;
}>();

const startOfMonth = computed(() => {
  return props.visibleDate.startOf('month');
});

const daysOffset = computed(() => {
  return startOfMonth.value.weekday();
});

const days = computed(() => {
  return startOfMonth.value.daysInMonth();
});

const nextMonthDays = computed(() => {
  return 42 - days.value - daysOffset.value;
});

const prevMonthDays = computed(() => {
  const count = startOfMonth.value.subtract(1, 'month').daysInMonth();
  return Array.from({ length: daysOffset.value }, (_, i) => count - i).reverse();
});

function checkAvailableDate(day: number, offset: number = 0) {
  const date = startOfMonth.value.add(offset, 'month').date(day);
  return date.isBetween(props.minDate, props.maxDate, 'day', '[]');
}

function isSelectedDate(day: number, offset: number = 0) {
  if (!props.modelValue) return false;
  if (props.isRange) {
    if (!props.modelValue || !Array.isArray(props.modelValue) || !props.modelValue.length) return false;

    const [start, end] = props.modelValue;
    if (start && end) {
      return (
        startOfMonth.value.add(offset, 'month').date(day).isSame(start) ||
        startOfMonth.value.add(offset, 'month').date(day).isSame(end)
      );
    }
    if (start) {
      return startOfMonth.value.add(offset, 'month').date(day).isSame(start);
    }
    return false;
  }
  if (!Array.isArray(props.modelValue)) {
    return startOfMonth.value.add(offset, 'month').date(day).isSame(props.modelValue, 'day');
  }
  return false;
}

function isRangeDate(day: number, offset: number = 0) {
  if (!props.modelValue || !Array.isArray(props.modelValue) || !props.modelValue.length) return false;
  const [start, end] = props.modelValue;
  if (start && end) {
    return startOfMonth.value.add(offset, 'month').date(day).isBetween(start, end, 'day', '[]');
  }
  return false;
}

function isFirstDateOfRange(day: number, offset: number = 0) {
  if (!props.modelValue || !Array.isArray(props.modelValue) || !props.modelValue.length) return false;
  const [start] = props.modelValue;
  if (start) {
    return startOfMonth.value.add(offset, 'month').date(day).isSame(start);
  }
  return false;
}

function isLastDateOfRange(day: number, offset: number = 0) {
  if (!props.modelValue || !Array.isArray(props.modelValue) || !props.modelValue.length) return false;
  const [, end] = props.modelValue;
  if (end) {
    return startOfMonth.value.add(offset, 'month').date(day).isSame(end);
  }
  return false;
}

function isWeekend(day: number, offset: number = 0) {
  const date = startOfMonth.value.add(offset, 'month').date(day);
  return date.day() === 0 || date.day() === 6;
}

function selectDate(day: number, offset: number = 0) {
  const newDate = startOfMonth.value.add(offset, 'month').date(day);
  if (offset !== 0) {
    emit('update:visible-date', newDate);
  }
  if (props.isRange) {
    if (!props.modelValue || !Array.isArray(props.modelValue)) {
      emit('update:model-value', [newDate, undefined]);
      return;
    }
    const [start, end] = props.modelValue;
    if ((start && end) || !start) {
      emit('update:model-value', [newDate, undefined]);
      return;
    }
    if (start) {
      const dates = [start, newDate].sort((a, b) => a.diff(b)) as [dayjs.Dayjs, dayjs.Dayjs];
      emit('update:model-value', dates);
      return;
    }
  }
  emit('update:model-value', newDate);
}
</script>
