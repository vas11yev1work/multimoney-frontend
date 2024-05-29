<template>
  <div class="rounded-xl bg-white p-3">
    <div class="mb-1 flex items-center justify-between">
      <UiTypo level="5" class="font-medium leading-5 text-slate-400">{{ title }}</UiTypo>
    </div>
    <div class="flex">
      <UiSuspense :data="balance">
        <UiTypo :class="[moneyColor, 'font-bold']" type="heading">{{ type === 'incomes' ? '+' : '-' }}</UiTypo>
        <UiMoney
          :value="balanceData?.amount ?? 0"
          :class="[moneyColor, 'font-bold']"
          type="heading"
          level="5"
          :currency="currency"
        />
        <template #loading>
          <UiSkeleton height="28px" width="100px" />
        </template>
        <!-- TODO: error -->
      </UiSuspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BalanceState, SharedData } from '@/shared/api';
import { Currency, CurrencyType } from '@/shared/lib';
import { UiMoney, UiSkeleton, UiSuspense, UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    type: 'incomes' | 'expenses';
    balance: SharedData<BalanceState>;
    currency: Currency | CurrencyType;
    incomeText?: string;
    expenseText?: string;
  }>(),
  {
    incomeText: 'Доходы за месяц',
    expenseText: 'Траты за месяц',
  }
);

const title = computed(() => {
  return props.type === 'incomes' ? props.incomeText : props.expenseText;
});

const moneyColor = computed(() => {
  return props.type === 'incomes' ? 'text-green-600' : 'text-slate-700';
});

const balanceData = computed(() => {
  if (!props.balance.data?.expenses) return;
  return props.balance.data[props.type][props.currency];
});
</script>
