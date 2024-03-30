import { defineStore } from 'pinia';
import { getDefaultSharedState, SharedData } from '@/shared/api';
import { Currency, CurrencyType } from '@/shared/lib';

interface AppSettingsModel {
  userCurrencies: SharedData<CurrencyType[]>;
  selectedCurrency: Currency | CurrencyType;
  mainCurrency: SharedData<Currency | CurrencyType>;
}

export const useAppSettingsModel = defineStore({
  id: 'app-settings',
  state: (): AppSettingsModel => ({
    userCurrencies: getDefaultSharedState({
      data: ['EUR', 'USD', 'RUB', 'KZT'],
    }),
    selectedCurrency: Currency.Euro,
    mainCurrency: getDefaultSharedState({
      data: Currency.Euro,
    }),
  }),
  actions: {
    setSelectedCurrency(currency: Currency | CurrencyType) {
      this.selectedCurrency = currency;
    },
    changeSelectedCurrency() {
      if (!this.userCurrencies.data) {
        return;
      }
      const index = this.userCurrencies.data?.indexOf(this.selectedCurrency);
      const nextIndex = (index + 1) % (this.userCurrencies.data?.length ?? 0);
      this.selectedCurrency = this.userCurrencies.data[nextIndex];
    },
  },
});
