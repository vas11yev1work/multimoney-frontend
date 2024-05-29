<template>
  <UiModal v-model="showValue" :title="title">
    <UiDatepicker v-model="date" :min-date="minDate" :max-date="maxDate" :range="range" />
    <UiButton size="large" block class="mt-3" :disabled="!isValidRange" @click="selectDate">Сохранить</UiButton>
  </UiModal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { UiButton } from '../ui-button';
import { DatepickerModel, UiDatepicker } from '../ui-datepicker';
import { UiModal } from '../ui-modal';

const props = withDefaults(
  defineProps<{
    modelValue?: DatepickerModel;
    title?: string;
    show: boolean;
    minDate?: dayjs.Dayjs;
    maxDate?: dayjs.Dayjs;
    range?: boolean;
  }>(),
  {
    modelValue: undefined,
    title: 'Выберите дату',
    minDate: undefined,
    maxDate: undefined,
    range: false,
  }
);

const emit = defineEmits<{
  (e: 'update:model-value', value: DatepickerModel): void;
  (e: 'update:show', value: boolean): void;
  (e: 'accept-invalid-range'): void;
}>();

const date = ref<DatepickerModel | undefined>(props.modelValue);

const showValue = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
});

const isValidRange = computed(() => {
  if (!props.range) {
    return true;
  }
  return props.range && Array.isArray(date.value) && !!date.value[0] && !!date.value[1];
});

function selectDate() {
  if (date.value) {
    if (props.range && Array.isArray(date.value) && (!date.value[0] || !date.value[1])) {
      return;
    }
    emit('update:show', false);
    emit('update:model-value', date.value);
  }
}
</script>
