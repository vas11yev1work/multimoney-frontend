import { defineStore } from 'pinia';
import { AppSettings, AppSettingsApi, getDefaultSharedState, loadSharedData, SharedData } from '@/shared/api';
import { Currency, CurrencyType } from '@/shared/lib';

interface AppSettingsModel {
  selectedCurrency: Currency | CurrencyType;
  appSettings: SharedData<AppSettings>;
}

export const useAppSettingsModel = defineStore({
  id: 'app-settings',
  state: (): AppSettingsModel => ({
    selectedCurrency: Currency.Euro,
    appSettings: getDefaultSharedState(),
  }),
  actions: {
    setSelectedCurrency(currency: Currency | CurrencyType) {
      this.selectedCurrency = currency;
    },
    changeSelectedCurrency() {
      if (!this.appSettings.data) {
        return;
      }
      const index = this.appSettings.data.userCurrencies?.indexOf(this.selectedCurrency);
      const nextIndex = (index + 1) % (this.appSettings.data.userCurrencies?.length ?? 0);
      this.selectedCurrency = this.appSettings.data.userCurrencies[nextIndex];
    },
    async loadAppSettings() {
      await loadSharedData({
        promise: () => AppSettingsApi.getAppSettings(),
        currentData: this.appSettings,
      });
    },
  },
  getters: {
    mainCurrency: (state: AppSettingsModel) => {
      return state.appSettings.data?.mainCurrency;
    },
  },
});
