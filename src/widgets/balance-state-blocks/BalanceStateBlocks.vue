<template>
  <div class="grid grid-cols-2 gap-4">
    <BalanceStateBlock type="incomes" :value="incomeAmount" :loading="loading" />
    <BalanceStateBlock type="expenses" :value="expenseAmount" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BalanceStateBlock } from '@/entities/balance-state';
import { AmountModel, Currency, CurrencyType } from '@/shared/lib';

const props = withDefaults(
  defineProps<{
    incomes?: number;
    expenses?: number;
    currency?: Currency | CurrencyType;
    loading?: boolean;
  }>(),
  {
    incomes: 0,
    expenses: 0,
    currency: undefined,
    loading: true,
  }
);

const incomeAmount = computed<AmountModel | undefined>(() => {
  if (!props.currency) return undefined;
  return {
    amount: props.incomes,
    currency: props.currency,
  };
});

const expenseAmount = computed<AmountModel | undefined>(() => {
  if (!props.currency) return undefined;
  return {
    amount: props.expenses,
    currency: props.currency,
  };
});
</script>
