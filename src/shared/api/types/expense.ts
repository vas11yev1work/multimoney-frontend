import { AmountModel } from '@/shared/lib';

export interface Expense {
  id: string;
  categoryId: string;
  amount: AmountModel;
}
