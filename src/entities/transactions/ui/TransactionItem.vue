<template>
  <div v-if="!loading">
    <div class="flex justify-between">
      <div class="flex">
        <div class="mr-3 flex h-10 w-10 min-w-10 items-center justify-center rounded-xl bg-gray-200">
          <UiIcon
            v-if="!isTransferTransaction"
            :icon-name="category?.icon ?? 'faHome'"
            size="lg"
            class="text-blue-500"
          />
          <UiIcon v-else icon-name="faArrowsTurnToDots" size="lg" class="text-blue-500" />
        </div>
        <div v-if="!isTransferTransaction" class="flex flex-col">
          <UiTypo class="mb-1 font-semibold leading-5">{{ category?.name }}</UiTypo>
          <UiTypo level="5" class="font-semibold text-slate-500">{{ card?.name }}</UiTypo>
        </div>
        <div v-else-if="card && toCard" class="flex flex-col">
          <UiTypo class="mb-1 font-semibold leading-5">{{ card.name }}</UiTypo>
          <UiTypo class="font-semibold leading-5">{{ toCard.name }}</UiTypo>
        </div>
      </div>
      <div v-if="transaction && !isTransferTransaction" class="flex flex-col items-end">
        <div class="mb-1 flex">
          <UiTypo :class="[moneyColor, 'font-bold leading-5']">{{ isExpenseTransaction ? '-' : '+' }}</UiTypo>
          <UiMoney
            :value="transaction.currencyAmount.amount"
            :currency="transaction.currencyAmount.currency"
            :class="[moneyColor, 'font-bold leading-5']"
          />
        </div>
        <UiMoney
          v-if="transaction.amount.currency !== transaction.currencyAmount.currency"
          :value="transaction.amount.amount"
          :currency="transaction.amount.currency"
          level="5"
          class="font-semibold text-slate-400"
        />
      </div>
      <div v-else-if="isTransferTransaction" class="flex flex-col items-end">
        <div class="mb-1 flex">
          <UiTypo :class="[moneyColor, 'font-bold leading-5']">-</UiTypo>
          <UiMoney
            :value="transaction.currencyAmount.amount"
            :currency="transaction.currencyAmount.currency"
            :class="[moneyColor, 'font-bold leading-5']"
          />
        </div>
        <div class="flex">
          <UiTypo :class="[moneyColor, 'font-bold leading-5']">+</UiTypo>
          <UiMoney
            :value="transaction.toCurrencyAmount.amount"
            :currency="transaction.toCurrencyAmount.currency"
            :class="[moneyColor, 'font-bold leading-5']"
          />
        </div>
      </div>
    </div>
    <UiMessage v-if="transaction?.description" class="ml-[52px] mt-1">
      {{ transaction.description }}
    </UiMessage>
  </div>
  <div v-else class="flex justify-between">
    <div class="flex">
      <UiSkeleton height="40px" width="40px" radius="0.75rem" mode="dark" class="mr-3" />
      <div class="flex flex-col">
        <UiSkeleton height="20px" width="100px" class="mb-1" mode="dark" />
        <UiSkeleton height="20px" width="150px" mode="dark" />
      </div>
    </div>
    <div class="flex flex-col items-end">
      <UiSkeleton height="20px" width="90px" class="mb-1" mode="dark" />
      <UiSkeleton height="20px" width="60px" mode="dark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card, ExpenseCategory, IncomeCategory, isExpense, isIncome, isTransfer, Transaction } from '@/shared/api';
import { UiIcon, UiMessage, UiMoney, UiSkeleton, UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    transaction?: Transaction;
    category?: IncomeCategory | ExpenseCategory;
    card?: Card;
    loading?: boolean;
    toCard?: Card;
  }>(),
  {
    transaction: undefined,
    loading: false,
    category: undefined,
    card: undefined,
    toCard: undefined,
  }
);

const isIncomeTransaction = computed(() => {
  if (!props.transaction) return false;
  return isIncome(props.transaction);
});

const isExpenseTransaction = computed(() => {
  if (!props.transaction) return false;
  return isExpense(props.transaction);
});

const isTransferTransaction = computed(() => {
  if (!props.transaction) return false;
  return isTransfer(props.transaction);
});

const moneyColor = computed(() => {
  return isIncomeTransaction.value ? 'text-green-600' : 'text-slate-700';
});
</script>
