import { AmountModel } from '@/shared/lib';

export interface BalanceState {
  total: AmountModel;
  incomes: AmountModel;
  expenses: AmountModel;
}
