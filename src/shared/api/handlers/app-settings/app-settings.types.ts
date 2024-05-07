import { CurrencyType } from '@/shared/lib';

export interface AppSettings {
  userCurrencies: CurrencyType[];
  mainCurrency: CurrencyType;
}
