<template>
  <div>
    <DatepickerHeader v-model="visibleDate" :min-date="minDate" :max-date="maxDate" />
    <DatepickerDates
      v-model:visible-date="visibleDate"
      :model-value="modelValue"
      :min-date="minDate"
      :max-date="maxDate"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import DatepickerDates from './DatepickerDates.vue';
import DatepickerHeader from './DatepickerHeader.vue';
import { Props } from './types';

const props = withDefaults(defineProps<Props>(), {
  minDate: () => dayjs().subtract(100, 'year').date(1).month(0),
  maxDate: () => dayjs().add(100, 'year').date(31).month(11),
});

defineEmits<{
  (e: 'update:model-value', value: dayjs.Dayjs): void;
}>();

/**
 * Месяц и год, которые видны в данный момент
 * */
const visibleDate = ref(dayjs(props.modelValue).isValid() ? dayjs(props.modelValue) : dayjs());
</script>
