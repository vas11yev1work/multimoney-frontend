<template>
  <div class="flex w-full flex-col gap-3">
    <ExpenseByCategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :amount="categoriesAmount.get(category.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ExpenseByCategoryItem } from '@/entities/expense-categories';
import { ExpenseCategory } from '@/shared/api';
import { AmountModel } from '@/shared/lib';

defineProps<{
  categories: ExpenseCategory[];
  categoriesAmount: Map<string, AmountModel>;
}>();
</script>
