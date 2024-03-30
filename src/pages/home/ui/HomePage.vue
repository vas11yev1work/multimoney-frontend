<template>
  <header class="fixed z-10 w-full rounded-b-xl bg-white py-4">
    <TotalBalance
      :balance="currentBalance"
      :loading="balanceState.loading"
      :currency="selectedCurrency"
      @change-currency="appSettingsModel.changeSelectedCurrency"
    />
  </header>
  <div class="pt-28">
    <UiContainer>
      <BalanceStateBlocks
        :incomes="incomeBalance"
        :expenses="expenseBalance"
        :currency="selectedCurrency"
        :loading="balanceState.loading"
      />
      <div class="mb-4 mt-5">
        <UiTypo type="heading" class="mb-4 font-semibold">Карты, счета, наличные</UiTypo>
        <CardsList :cards="cards.data" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <AddCategory />
        <!-- TODO: AddTransaction -->
      </div>
      <div class="mt-4 rounded-xl bg-white p-4">
        <UiTypo type="heading" class="mb-2 font-semibold">Расходы по категориям</UiTypo>
        <ExpensesState :expenses="expenses.data" />
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { AddCategory } from '@/widgets/add-category';
import { BalanceStateBlocks } from '@/widgets/balance-state-blocks';
import { CardsList } from '@/widgets/cards-list';
import { ExpensesState } from '@/widgets/expenses-state';
import { useAppSettingsModel } from '@/entities/app-settings';
import { TotalBalance, useBalanceStateModel } from '@/entities/balance-state';
import { useCardModel } from '@/entities/card';
import { useExpenseModel } from '@/entities/expense';
import { UiContainer, UiTypo } from '@/shared/ui';

const balanceStateModel = useBalanceStateModel();
const { balanceState } = storeToRefs(balanceStateModel);

const cardModel = useCardModel();
const { cards } = storeToRefs(cardModel);

const expenseModel = useExpenseModel();
const { expenses } = storeToRefs(expenseModel);

const appSettingsModel = useAppSettingsModel();
const { selectedCurrency } = storeToRefs(appSettingsModel);

const currentBalance = computed(() => {
  if (!balanceState.value.data?.total) return 0;
  return balanceState.value.data.total[selectedCurrency.value]?.amount || 0;
});

const expenseBalance = computed(() => {
  if (!balanceState.value.data?.expenses) return 0;
  return balanceState.value.data.expenses[selectedCurrency.value]?.amount || 0;
});

const incomeBalance = computed(() => {
  if (!balanceState.value.data?.incomes) return 0;
  return balanceState.value.data.incomes[selectedCurrency.value]?.amount || 0;
});
</script>
