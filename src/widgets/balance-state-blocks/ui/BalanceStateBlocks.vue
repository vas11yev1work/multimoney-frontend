<template>
  <div class="grid grid-cols-2 gap-4">
    <BalanceStateBlock type="incomes" :currency="currency" :balance="balance" />
    <BalanceStateBlock type="expenses" :currency="currency" :balance="balance" />
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
  }>(),
  {
    currency: 'EUR',
  }
);
</script>
