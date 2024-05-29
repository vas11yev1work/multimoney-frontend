<template>
  <div class="grid grid-cols-2 gap-4">
    <BalanceStateBlock type="incomes" :currency="currency" :balance="balance" :income-text="incomeText" />
    <BalanceStateBlock type="expenses" :currency="currency" :balance="balance" :expense-text="expenseText" />
  </div>
</template>

<script setup lang="ts">
import { BalanceStateBlock } from '@/entities/balance-state';
import { BalanceState, SharedData } from '@/shared/api';
import { Currency, CurrencyType } from '@/shared/lib';

withDefaults(
  defineProps<{
    balance: SharedData<BalanceState>;
    currency?: Currency | CurrencyType;
    incomeText?: string;
    expenseText?: string;
  }>(),
  {
    currency: 'EUR',
    incomeText: undefined,
    expenseText: undefined,
  }
);
</script>
