<template>
  <div class="flex w-full flex-col gap-3">
    <ExpenseByCategoryItem v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>

<script setup lang="ts">
import { ExpenseByCategoryItem } from '@/entities/expense-category';
import { ExpenseCategory } from '@/shared/api';

defineProps<{
  categories: ExpenseCategory[];
}>();
</script>
