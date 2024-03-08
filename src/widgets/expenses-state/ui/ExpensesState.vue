<template>
  <div class="flex w-full flex-col gap-3">
    <ExpenseItem
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
      :category="expenseCategoryModel.getCategoryById(expense.categoryId)"
    />
  </div>
</template>

<script setup lang="ts">
import { ExpenseItem } from '@/entities/expense';
import { useExpenseCategoryModel } from '@/entities/expense-category';
import { Expense } from '@/shared/api';

defineProps<{
  expenses?: Expense[];
}>();

const expenseCategoryModel = useExpenseCategoryModel();
</script>
