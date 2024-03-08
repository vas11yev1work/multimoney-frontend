import { defineStore } from 'pinia';
import { getDefaultSharedState, SharedData } from '@/shared/api';
import { Expense } from '@/shared/api';

interface ExpenseModel {
  expenses: SharedData<Expense[]>;
}

export const useExpenseModel = defineStore({
  id: 'expense',
  state: (): ExpenseModel => ({
    expenses: getDefaultSharedState<Expense[]>({
      data: [
        {
          id: '1',
          categoryId: '1',
          amount: {
            amount: 104.12,
            currency: 'EUR',
          },
        },
        {
          id: '2',
          categoryId: '2',
          amount: {
            amount: 87.09,
            currency: 'EUR',
          },
        },
        {
          id: '3',
          categoryId: '3',
          amount: {
            amount: 134.31,
            currency: 'EUR',
          },
        },
      ],
    }),
  }),
});
