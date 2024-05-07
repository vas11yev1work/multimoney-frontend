import { defineStore } from 'pinia';
import { BalanceState, BalanceStateApi, getDefaultSharedState, loadSharedData, SharedData } from '@/shared/api';

interface BalanceStateModel {
  balanceState: SharedData<BalanceState>;
}

export const useBalanceStateModel = defineStore({
  id: 'balance-state',
  state: (): BalanceStateModel => ({
    balanceState: getDefaultSharedState(),
  }),
  actions: {
    async loadBalanceState() {
      await loadSharedData({
        promise: () => BalanceStateApi.getBalanceState(),
        currentData: this.balanceState,
      });
    },
  },
});
