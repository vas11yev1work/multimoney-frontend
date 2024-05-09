<template>
  <UiModal v-model="showValue" :title="title">
    <UiDatepicker v-model="date" :min-date="minDate" :max-date="maxDate" />
    <UiButton size="large" block class="mt-3" @click="selectDate">Сохранить</UiButton>
  </UiModal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { UiButton } from '../ui-button';
import { UiDatepicker } from '../ui-datepicker';
import { UiModal } from '../ui-modal';

const props = withDefaults(
  defineProps<{
    modelValue?: dayjs.Dayjs;
    title?: string;
    show: boolean;
    minDate?: dayjs.Dayjs;
    maxDate?: dayjs.Dayjs;
  }>(),
  {
    modelValue: undefined,
    title: 'Выберите дату',
    minDate: undefined,
    maxDate: undefined,
  }
);

const emit = defineEmits<{
  (e: 'update:model-value', value: dayjs.Dayjs): void;
  (e: 'update:show', value: boolean): void;
}>();

const date = ref<dayjs.Dayjs | undefined>(props.modelValue);

const showValue = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
});

function selectDate() {
  if (date.value) {
    emit('update:model-value', date.value);
    emit('update:show', false);
  }
}
</script>
