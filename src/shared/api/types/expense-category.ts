import { AmountModel } from '@/shared/lib';

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  limit?: AmountModel;
}
