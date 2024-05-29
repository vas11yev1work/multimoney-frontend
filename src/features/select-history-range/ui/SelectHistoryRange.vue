<template>
  <UiContainer class="flex items-center justify-between" @click="showModal = true">
    <div class="flex h-full flex-col justify-center">
      <UiTypo level="5" class="mb-1 font-semibold leading-5 text-slate-400">История за период</UiTypo>
      <UiTypo v-if="valueData && Array.isArray(valueData) && valueData.length === 2" class="font-semibold">
        {{ valueData[0]?.format('D MMM YYYY') }} — {{ valueData[1]?.format('D MMM YYYY') }}
      </UiTypo>
      <UiTypo v-else class="font-semibold">Нажмите, чтобы выбрать период</UiTypo>
    </div>
    <UiIcon icon-name="faCalendarDays" size="lg" class="text-slate-400" />
  </UiContainer>
  <UiDatepickerModal
    v-model="valueData"
    v-model:show="showModal"
    range
    title="Выберите период"
    :max-date="dayjs().endOf('day')"
    @accept-invalid-range="valueData = []"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { type DatepickerModel, UiContainer, UiDatepickerModal, UiIcon, UiTypo } from '@/shared/ui';

const props = defineProps<{
  modelValue: DatepickerModel;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: DatepickerModel): void;
}>();

const showModal = ref(false);

const valueData = computed({
  get: () => props.modelValue,
  set: (value: DatepickerModel) => emit('update:model-value', value),
});
</script>
