import { Currency, CurrencyType } from './currency.ts';

export interface AmountModel {
  amount: number;
  currency: Currency | CurrencyType;
}
