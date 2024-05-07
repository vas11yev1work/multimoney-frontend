<template>
  <div class="flex w-full flex-col gap-3">
    <ExpenseByCategoryItem
      v-for="category in sortedCategories"
      :key="category.id"
      :category="category"
      :amount="categoriesAmount.get(category.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { computed } from 'vue';
import { ExpenseByCategoryItem } from '@/entities/expense-categories';
import { ExpenseCategory } from '@/shared/api';
import { AmountModel } from '@/shared/lib';

const props = defineProps<{
  categories: ExpenseCategory[];
  categoriesAmount: Map<string, AmountModel>;
}>();

const sortedCategories = computed(() => {
  return cloneDeep(props.categories)
    .sort(
      (a: ExpenseCategory, b: ExpenseCategory) =>
        (props.categoriesAmount.get(b.id)?.amount || 0) - (props.categoriesAmount.get(a.id)?.amount || 0)
    )
    .filter((category: ExpenseCategory) => props.categoriesAmount.get(category.id)?.amount);
});
</script>
