import { AmountModel } from '@/shared/lib';

export interface Expense {
  id: string;
  amount: AmountModel;
  currencyAmount: AmountModel;
  description?: string;
  date: string;
  cardId: string;
  categoryId: string;
}
