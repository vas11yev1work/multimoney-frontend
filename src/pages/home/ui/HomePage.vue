<template>
  <header class="fixed z-10 w-full rounded-b-xl bg-white py-4">
    <TotalBalance
      :balance="balanceStateModel.balanceState"
      :currency="appSettingsModel.selectedCurrency"
      @change-currency="appSettingsModel.changeSelectedCurrency"
    />
  </header>
  <div class="pt-28">
    <UiContainer>
      <BalanceStateBlocks :balance="balanceStateModel.balanceState" :currency="appSettingsModel.selectedCurrency" />
      <div class="mb-4 mt-5">
        <UiTypo type="heading" class="mb-4 font-semibold">Карты, счета, наличные</UiTypo>
        <CardsList :cards="cardsModel.cards" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <AddCategory />
        <AddTransaction />
      </div>
      <div class="mt-4 rounded-xl bg-white p-4">
        <UiTypo type="heading" class="mb-2 font-semibold">Расходы за месяц</UiTypo>
        <ExpensesByCategoryState
          :categories="expenseCategoryModel.categories"
          :expenses="expensesModel.expenses"
          :categories-amount="expensesModel.expensesAmountByCategoryId"
        />
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import { AddCategory } from '@/widgets/add-category';
import { AddTransaction } from '@/widgets/add-transaction';
import { BalanceStateBlocks } from '@/widgets/balance-state-blocks';
import { CardsList } from '@/widgets/cards-list';
import { ExpensesByCategoryState } from '@/widgets/expenses-state';
import { useAppSettingsModel } from '@/entities/app-settings';
import { TotalBalance, useBalanceStateModel } from '@/entities/balance-state';
import { useCardsModel } from '@/entities/cards';
import { useExpenseCategoriesModel } from '@/entities/expense-categories';
import { useExpensesModel } from '@/entities/expenses';
import { UiContainer, UiTypo } from '@/shared/ui';

const balanceStateModel = useBalanceStateModel();
const cardsModel = useCardsModel();
const appSettingsModel = useAppSettingsModel();
const expenseCategoryModel = useExpenseCategoriesModel();
const expensesModel = useExpensesModel();
</script>
