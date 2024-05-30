<template>
  <UiSuspense :data="[transactions, incomeCategoriesModel.categories, expenseCategoriesModel.categories]">
    <div v-for="[date, transactionsList] in transactionsByDateMap" :key="date" class="mb-6 last:mb-0">
      <UiTypo level="3" class="mb-4 font-semibold">{{ getTextDate(dayjs(date)) }}</UiTypo>
      <div class="flex flex-col gap-4">
        <div v-for="transaction in transactionsList" :key="transaction.id">
          <TransactionItem
            :transaction="transaction"
            :category="getTransactionCategory(transaction)"
            :card="getTransactionCard(transaction)"
          />
        </div>
      </div>
    </div>
    <template #loading>
      <div v-for="i in 3" :key="i" class="mb-6 last:mb-0">
        <div class="flex flex-col">
          <UiSkeleton height="28px" width="140px" mode="dark" class="mb-4" />
          <div class="flex flex-col gap-4">
            <div v-for="j in 4" :key="j">
              <TransactionItem loading />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- TODO: error -->
  </UiSuspense>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useCardsModel } from '@/entities/cards';
import { useExpenseCategoriesModel } from '@/entities/expense-categories';
import { useIncomeCategoriesModel } from '@/entities/income-categories';
import { TransactionItem } from '@/entities/transactions';
import { Card, ExpenseCategory, IncomeCategory, isExpense, isIncome, SharedData, Transaction } from '@/shared/api';
import { getTextDate } from '@/shared/lib';
import { UiSkeleton, UiSuspense, UiTypo } from '@/shared/ui';

const props = defineProps<{
  transactions: SharedData<Transaction[]>;
}>();

const incomeCategoriesModel = useIncomeCategoriesModel();
const expenseCategoriesModel = useExpenseCategoriesModel();
const cardsModel = useCardsModel();

const transactionsByDateMap = computed(() => {
  const map = new Map<string, Transaction[]>();
  if (!props.transactions.data) return map;
  props.transactions.data.forEach(transaction => {
    const key = dayjs(transaction.date).format('YYYY-MM-DD');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)?.push(transaction);
  });
  return map;
});

function getTransactionCategory(transaction: Transaction): IncomeCategory | ExpenseCategory | undefined {
  if (isIncome(transaction)) {
    return incomeCategoriesModel.categoriesMapById.get(transaction.categoryId);
  } else if (isExpense(transaction)) {
    return expenseCategoriesModel.categoriesMapById.get(transaction.categoryId);
  }
  return;
}

function getTransactionCard(transaction: Transaction): Card | undefined {
  return cardsModel.cardsMapById.get(transaction.cardId);
}
</script>
