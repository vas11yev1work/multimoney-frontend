import { defineStore } from 'pinia';
import { SharedData, Expense, getDefaultSharedState, loadSharedData, ExpensesApi } from '@/shared/api';
import { AmountModel } from '@/shared/lib';

interface ExpensesModel {
  expenses: SharedData<Expense[]>;
}

export const useExpensesModel = defineStore({
  id: 'expenses',
  state: (): ExpensesModel => ({
    expenses: getDefaultSharedState(),
  }),
  actions: {
    async loadExpenses() {
      await loadSharedData({
        promise: () => ExpensesApi.getExpenses(),
        currentData: this.expenses,
      });
    },
  },
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
