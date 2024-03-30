<template>
  <AddCategoryWrapper>
    <template #income>
      <AddIncomeCategory />
    </template>
  </AddCategoryWrapper>
</template>

<script setup lang="ts">
import { AddCategoryWrapper } from '@/features/add-category-wrapper';
import { AddIncomeCategory } from '@/features/add-income-category';
</script>
