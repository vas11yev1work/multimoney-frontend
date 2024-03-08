import { defineStore } from 'pinia';
import { getDefaultSharedState, SharedData, BalanceState } from '@/shared/api';

interface BalanceStateModel {
  balanceState: SharedData<BalanceState>;
}

export const useBalanceStateModel = defineStore({
  id: 'balance-state',
  state: (): BalanceStateModel => ({
    balanceState: getDefaultSharedState<BalanceState>({
      data: {
        total: {
          amount: 8546.31,
          currency: 'EUR',
        },
        incomes: {
          amount: 4521.56,
          currency: 'EUR',
        },
        expenses: {
          amount: 549.3,
          currency: 'EUR',
        },
      },
    }),
  }),
});
