<template>
  <UiSuspense :data="appSettingsModel.appSettings">
    <main class="pb-20">
      <RouterView />
    </main>
    <!-- TODO: loading and error -->
  </UiSuspense>
  <UserFooter :items="footerItems" />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { FooterItem, UserFooter } from '@/widgets/user-footer';
import { useAppSettingsModel } from '@/entities/app-settings';
import { useBalanceStateModel } from '@/entities/balance-state';
import { useCardsModel } from '@/entities/cards';
import { useExpenseCategoriesModel } from '@/entities/expense-categories';
import { useExpensesModel } from '@/entities/expenses';
import { useIncomeCategoriesModel } from '@/entities/income-categories';
import { UiSuspense } from '@/shared/ui';

const footerItems: FooterItem[] = [
  {
    label: 'Главная',
    icon: 'faHome',
    route: 'HomePage',
  },
  {
    label: 'Статистика',
    icon: 'faChartSimple',
    route: 'HomePage',
  },
  {
    label: 'История',
    icon: 'faClock',
    route: 'HomePage',
  },
  {
    label: 'Настройки',
    icon: 'faGear',
    route: 'HomePage',
  },
];

const balanceStateModel = useBalanceStateModel();
const appSettingsModel = useAppSettingsModel();
const cardsModel = useCardsModel();
const expenseCategoriesModel = useExpenseCategoriesModel();
const incomeCategoriesModel = useIncomeCategoriesModel();
const expensesModel = useExpensesModel();

onBeforeMount(async () => {
  await appSettingsModel.loadAppSettings();
  await Promise.all([
    balanceStateModel.loadBalanceState(),
    cardsModel.loadCards(),
    expenseCategoriesModel.loadCategories(),
    incomeCategoriesModel.loadCategories(),
    expensesModel.loadExpenses(),
  ]);
});
</script>
