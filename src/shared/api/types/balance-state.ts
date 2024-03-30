import { AmountModel, Currency } from '@/shared/lib';

export interface BalanceState {
  total: Partial<Record<Currency, AmountModel>>;
  incomes: Partial<Record<Currency, AmountModel>>;
  expenses: Partial<Record<Currency, AmountModel>>;
}
