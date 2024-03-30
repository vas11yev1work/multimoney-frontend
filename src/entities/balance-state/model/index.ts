import { defineStore } from 'pinia';
import { BalanceState, getDefaultSharedState, SharedData } from '@/shared/api';

interface BalanceStateModel {
  balanceState: SharedData<BalanceState>;
}

export const useBalanceStateModel = defineStore({
  id: 'balance-state',
  state: (): BalanceStateModel => ({
    balanceState: getDefaultSharedState<BalanceState>({
      data: {
        total: {
          EUR: {
            amount: 8546.31,
            currency: 'EUR',
          },
          USD: {
            amount: 9283.43,
            currency: 'USD',
          },
          RUB: {
            amount: 855328.75,
            currency: 'RUB',
          },
          KZT: {
            amount: 4163679.28,
            currency: 'KZT',
          },
        },
        incomes: {
          EUR: {
            amount: 4521.56,
            currency: 'EUR',
          },
          USD: {
            amount: 4911.54,
            currency: 'USD',
          },
          RUB: {
            amount: 491555,
            currency: 'RUB',
          },
          KZT: {
            amount: 2202860.15,
            currency: 'KZT',
          },
        },
        expenses: {
          EUR: {
            amount: 549.3,
            currency: 'EUR',
          },
          USD: {
            amount: 596.68,
            currency: 'USD',
          },
          RUB: {
            amount: 54974.85,
            currency: 'RUB',
          },
          KZT: {
            amount: 267613.63,
            currency: 'KZT',
          },
        },
      },
    }),
  }),
});
