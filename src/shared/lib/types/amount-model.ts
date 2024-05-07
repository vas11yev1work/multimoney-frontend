import { Currency, CurrencyType } from './currency';

export interface AmountModel {
  amount: number;
  currency: Currency | CurrencyType;
}
