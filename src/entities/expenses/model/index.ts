import { defineStore } from 'pinia';
import { SharedData, Expense, getDefaultSharedState } from '@/shared/api';
import { AmountModel } from '@/shared/lib';

interface ExpensesModel {
  expenses: SharedData<Expense[]>;
}

export const useExpensesModel = defineStore({
  id: 'expenses',
  state: (): ExpensesModel => ({
    expenses: getDefaultSharedState<Expense[]>({
      data: [
        {
          id: '1',
          amount: { amount: 10.36, currency: 'EUR' },
          currencyAmount: { amount: 10.36, currency: 'EUR' },
          date: '2021-06-05T19:16:32.231Z',
          cardId: '789',
          categoryId: '1',
        },
        {
          id: '2',
          amount: { amount: 12.07, currency: 'EUR' },
          currencyAmount: { amount: 1189.67, currency: 'RUB' },
          date: '2021-06-05T19:16:32.231Z',
          cardId: '456',
          categoryId: '1',
        },
        {
          id: '3',
          amount: { amount: 8.34, currency: 'EUR' },
          currencyAmount: { amount: 822.03, currency: 'RUB' },
          date: '2021-06-05T19:16:32.231Z',
          cardId: '456',
          categoryId: '3',
        },
      ],
    }),
  }),
  getters: {
    expensesMapByCategoryId: (state: ExpensesModel) => {
      const map = new Map<string, Expense[]>();

      if (!state.expenses.data) return map;

      state.expenses.data.forEach(expense => {
        if (!map.has(expense.categoryId)) {
          map.set(expense.categoryId, []);
        }
        map.get(expense.categoryId)?.push(expense);
      });
      return map;
    },
    expensesAmountByCategoryId: (state: ExpensesModel) => {
      if (!state.expenses.data) return new Map<string, AmountModel>();

      return new Map(
        Object.entries(
          state.expenses.data.reduce<Record<string, AmountModel>>((acc, expense) => {
            const { categoryId, amount } = expense;
            const totalAmount = amount.amount;

            if (acc[categoryId]) {
              acc[categoryId].amount += totalAmount;
            } else {
              acc[categoryId] = { amount: totalAmount, currency: amount.currency };
            }

            return acc;
          }, {})
        )
      );
    },
  },
});
