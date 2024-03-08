<template>
  <div class="rounded-xl bg-white p-3">
    <div class="flex items-center justify-between">
      <UiTypo level="5" class="font-medium leading-5 text-slate-400">{{ title }}</UiTypo>
    </div>
    <div class="flex">
      <UiTypo :class="[moneyColor, 'font-bold']" type="heading">{{ type === 'incomes' ? '+' : '-' }}</UiTypo>
      <UiMoney
        :value="value?.amount || 0"
        :class="[moneyColor, 'font-bold']"
        type="heading"
        :currency="value?.currency"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AmountModel } from '@/shared/lib';
import { UiMoney, UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    type: 'incomes' | 'expenses';
    value?: AmountModel;
    loading: boolean;
  }>(),
  {
    value: undefined,
    loading: true,
  }
);

const title = computed(() => {
  return props.type === 'incomes' ? 'Доходы (мес.)' : 'Траты (мес.)';
});

const moneyColor = computed(() => {
  return props.type === 'incomes' ? 'text-green-600' : 'text-slate-700';
});
</script>
