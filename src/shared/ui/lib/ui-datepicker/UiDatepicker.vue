<template>
  <div>
    <DatepickerHeader v-model="visibleDate" :min-date="minDate" :max-date="maxDate" />
    <DatepickerDates
      v-model:visible-date="visibleDate"
      :model-value="modelValue"
      :min-date="minDate"
      :max-date="maxDate"
      :is-range="isRange"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import DatepickerDates from './DatepickerDates.vue';
import DatepickerHeader from './DatepickerHeader.vue';
import { DatepickerModel, Props } from './types';

const props = withDefaults(defineProps<Props>(), {
  minDate: () => dayjs().subtract(100, 'year').date(1).month(0),
  maxDate: () => dayjs().add(100, 'year').date(31).month(11),
  range: false,
});

defineEmits<{
  (e: 'update:model-value', value: DatepickerModel): void;
}>();

const isRange = computed(() => props.range && (!props.modelValue || Array.isArray(props.modelValue)));

/**
 * Месяц и год, которые видны в данный момент
 * */
const visibleDate = ref(prepareVisibleDate());

function prepareVisibleDate(): dayjs.Dayjs {
  if (!props.modelValue) {
    return dayjs();
  }
  if (isRange.value) {
    return Array.isArray(props.modelValue) ? props.modelValue[0] ?? dayjs() : dayjs();
  }
  return props.modelValue as dayjs.Dayjs;
}
</script>
