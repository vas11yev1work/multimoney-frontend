<template>
  <AddTransactionWrapper>
    <template #income>
      <AddIncome />
    </template>
    <template #expense>
      <AddExpense />
    </template>
    <template #transfer>TRANSFER</template>
  </AddTransactionWrapper>
</template>

<script setup lang="ts">
import { AddExpense } from '@/features/add-expense';
import { AddIncome } from '@/features/add-income';
import AddTransactionWrapper from './AddTransactionWrapper.vue';
</script>
