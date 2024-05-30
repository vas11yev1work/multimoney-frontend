<template>
  <header class="fixed z-10 w-full rounded-b-xl bg-white py-4">
    <SelectHistoryRange v-model="range" />
  </header>
  <div class="pt-24">
    <UiContainer>
      <BalanceStateBlocks
        :balance="balanceStateModel.balanceState"
        :currency="appSettingsModel.mainCurrency"
        income-text="Доходы за период"
        expense-text="Расходы за период"
        class="mb-3"
      />
      <TransactionsList :transactions="transactionsModel.transactions" />
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import { BalanceStateBlocks } from '@/widgets/balance-state-blocks';
import { TransactionsList } from '@/widgets/transactions-list';
import { SelectHistoryRange } from '@/features/select-history-range';
import { useAppSettingsModel } from '@/entities/app-settings';
import { useBalanceStateModel } from '@/entities/balance-state';
import { useTransactionsModel } from '@/entities/transactions';
import { DatepickerModel, UiContainer } from '@/shared/ui';

const appSettingsModel = useAppSettingsModel();
const balanceStateModel = useBalanceStateModel();
const transactionsModel = useTransactionsModel();

const range = ref<DatepickerModel>([dayjs().startOf('month'), dayjs().endOf('day')]);
</script>
