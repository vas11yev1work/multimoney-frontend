<template>
  <header class="fixed z-10 w-full rounded-b-xl bg-white py-4">
    <TotalBalance :balance="balanceState.data?.total" :loading="balanceState.loading" />
  </header>
  <div class="pt-28">
    <UiContainer>
      <BalanceStateBlocks
        :incomes="balanceState.data?.incomes"
        :expenses="balanceState.data?.expenses"
        :loading="balanceState.loading"
      />
      <div class="mt-5">
        <UiTypo type="heading" class="mb-4 font-semibold">Карты, счета, наличные</UiTypo>
        <CardsList :cards="cards.data" />
      </div>
      <div class="mt-4 rounded-xl bg-white p-4">
        <UiTypo type="heading" class="mb-2 font-semibold">Расходы за месяц</UiTypo>
        <ExpensesState :expenses="expenses.data" />
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { BalanceStateBlocks } from '@/widgets/balance-state-blocks';
import { CardsList } from '@/widgets/cards-list';
import { ExpensesState } from '@/widgets/expenses-state';
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
</script>
