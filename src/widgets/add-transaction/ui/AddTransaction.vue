<template>
  <AddTransactionWrapper>
    <template #income>
      <AddIncome />
    </template>
    <template #expense>
      <AddExpense />
    </template>
    <template #transfer>
      <AddTransfer />
    </template>
  </AddTransactionWrapper>
</template>

<script setup lang="ts">
import { AddExpense } from '@/features/add-expense';
import { AddIncome } from '@/features/add-income';
import { AddTransfer } from '@/features/add-transfer';
import AddTransactionWrapper from './AddTransactionWrapper.vue';
</script>
