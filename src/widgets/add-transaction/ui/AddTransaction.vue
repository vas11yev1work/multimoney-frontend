<template>
  <AddTransactionWrapper>
    <template #income>INCOME</template>
    <template #expense>
      <AddExpense />
    </template>
    <template #transfer>TRANSFER</template>
  </AddTransactionWrapper>
</template>

<script setup lang="ts">
import { AddExpense } from '@/features/add-expense';
import AddTransactionWrapper from './AddTransactionWrapper.vue';
</script>
