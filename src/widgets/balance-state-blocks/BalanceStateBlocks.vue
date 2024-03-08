<template>
  <div class="grid grid-cols-2 gap-4">
    <BalanceStateBlock type="incomes" :value="incomes" :loading="loading" />
    <BalanceStateBlock type="expenses" :value="expenses" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { BalanceStateBlock } from '@/entities/balance-state';
import { AmountModel } from '@/shared/lib';

withDefaults(
  defineProps<{
    incomes?: AmountModel;
    expenses?: AmountModel;
    loading?: boolean;
  }>(),
  {
    incomes: undefined,
    expenses: undefined,
    loading: true,
  }
);
</script>
