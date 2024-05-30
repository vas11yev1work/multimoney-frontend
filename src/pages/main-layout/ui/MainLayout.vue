<template>
  <UiSuspense :data="appSettingsModel.appSettings">
    <main :class="$style.padding">
      <RouterView />
    </main>
    <UserFooter :items="footerItems" />
    <!-- TODO: loading and error -->
  </UiSuspense>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { FooterItem, UserFooter } from '@/widgets/user-footer';
import { useAppSettingsModel } from '@/entities/app-settings';
import { useBalanceStateModel } from '@/entities/balance-state';
import { useCardsModel } from '@/entities/cards';
import { useExpenseCategoriesModel } from '@/entities/expense-categories';
import { useIncomeCategoriesModel } from '@/entities/income-categories';
import { useTransactionsModel } from '@/entities/transactions';
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
    route: 'HistoryPage',
  },
  {
    label: 'Настройки',
    icon: 'faGear',
    route: 'DebugPage',
  },
];

const balanceStateModel = useBalanceStateModel();
const appSettingsModel = useAppSettingsModel();
const cardsModel = useCardsModel();
const expenseCategoriesModel = useExpenseCategoriesModel();
const incomeCategoriesModel = useIncomeCategoriesModel();
const transactionsModel = useTransactionsModel();

onBeforeMount(async () => {
  await appSettingsModel.loadAppSettings();
  await Promise.all([
    balanceStateModel.loadBalanceState(),
    cardsModel.loadCards(),
    expenseCategoriesModel.loadCategories(),
    incomeCategoriesModel.loadCategories(),
    transactionsModel.loadTransactions(),
  ]);
});
</script>

<style module>
.padding {
  padding-bottom: 80px;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
}
</style>
