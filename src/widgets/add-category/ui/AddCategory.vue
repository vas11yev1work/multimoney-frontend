<template>
  <AddCategoryWrapper>
    <template #income>
      <AddIncomeCategory />
    </template>
    <template #expense>
      <AddExpenseCategory />
    </template>
  </AddCategoryWrapper>
</template>

<script setup lang="ts">
import { AddExpenseCategory } from '@/features/add-expense-category';
import { AddIncomeCategory } from '@/features/add-income-category';
import AddCategoryWrapper from './AddCategoryWrapper.vue';
</script>
