<template>
  <div class="flex w-full flex-col gap-3">
    <UiSuspense :data="[categories, transactions]">
      <ExpenseByCategoryItem
        v-for="category in sortedCategories"
        :key="category.id"
        :category="category"
        :amount="categoriesAmount.get(category.id)"
      />
      <template #loading>
        <div v-for="n in 5" :key="n" class="flex items-center">
          <UiSkeleton height="40px" width="40px" radius="0.75rem" />
          <div class="ml-3">
            <UiSkeleton height="16px" width="80px" class="mb-1" />
            <UiSkeleton height="24px" width="140px" />
          </div>
        </div>
      </template>
      <!-- TODO: error -->
    </UiSuspense>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { computed } from 'vue';
import { ExpenseByCategoryItem } from '@/entities/expense-categories';
import { ExpenseCategory, SharedData, Transaction } from '@/shared/api';
import { AmountModel } from '@/shared/lib';
import { UiSkeleton, UiSuspense } from '@/shared/ui';

const props = defineProps<{
  categories: SharedData<ExpenseCategory[]>;
  transactions: SharedData<Transaction[]>;
  categoriesAmount: Map<string, AmountModel>;
}>();

const sortedCategories = computed(() => {
  if (!props.categories.data) {
    return [];
  }
  return cloneDeep(props.categories.data)
    .sort(
      (a: ExpenseCategory, b: ExpenseCategory) =>
        (props.categoriesAmount.get(b.id)?.amount || 0) - (props.categoriesAmount.get(a.id)?.amount || 0)
    )
    .filter((category: ExpenseCategory) => props.categoriesAmount.get(category.id)?.amount);
});
</script>
