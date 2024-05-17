import { defineStore } from 'pinia';
import {
  SharedData,
  getDefaultSharedState,
  loadSharedData,
  isIncome,
  isTransfer,
  isExpense,
  Transaction,
  TransactionsApi,
  TransactionExpense,
  TransactionIncome,
  TransactionTransfer,
} from '@/shared/api';
import { AmountModel } from '@/shared/lib';

interface TransactionsModel {
  transactions: SharedData<Transaction[]>;
}

export const useTransactionsModel = defineStore({
  id: 'transactions',
  state: (): TransactionsModel => ({
    transactions: getDefaultSharedState(),
  }),
  actions: {
    async loadTransactions() {
      await loadSharedData({
        promise: () => TransactionsApi.getTransactions(),
        currentData: this.transactions,
      });
    },
  },
  getters: {
    expenses: (state: TransactionsModel): TransactionExpense[] => {
      if (!state.transactions.data) return [];
      return state.transactions.data.filter(isExpense);
    },
    incomes: (state: TransactionsModel): TransactionIncome[] => {
      if (!state.transactions.data) return [];
      return state.transactions.data.filter(isIncome);
    },
    transfers: (state: TransactionsModel): TransactionTransfer[] => {
      if (!state.transactions.data) return [];
      return state.transactions.data.filter(isTransfer);
    },
    expensesMapByCategoryId() {
      const map = new Map<string, TransactionExpense[]>();

      if (!this.expenses.length) return map;

      this.expenses.forEach(expense => {
        if (!map.has(expense.categoryId)) {
          map.set(expense.categoryId, []);
        }
        map.get(expense.categoryId)?.push(expense);
      });
      return map;
    },
    incomesMapByCategoryId() {
      const map = new Map<string, TransactionIncome[]>();

      if (!this.incomes.length) return map;

      this.incomes.forEach(income => {
        if (!map.has(income.categoryId)) {
          map.set(income.categoryId, []);
        }
        map.get(income.categoryId)?.push(income);
      });
      return map;
    },
    expensesAmountByCategoryId(): Map<string, AmountModel> {
      const map = new Map<string, AmountModel>();
      if (!this.expenses.length) return map;

      this.expenses.forEach(expense => {
        const expensesByCategory = this.expensesMapByCategoryId.get(expense.categoryId) ?? [];
        const sum = expensesByCategory.reduce((acc, curr) => acc + curr.amount.amount, 0);
        map.set(expense.categoryId, { amount: sum, currency: expense.amount.currency });
      });
      return map;
    },
    incomesAmountByCategoryId(): Map<string, AmountModel> {
      const map = new Map<string, AmountModel>();
      if (!this.incomes.length) return map;

      this.incomes.forEach(income => {
        const incomesByCategory = this.incomesMapByCategoryId.get(income.categoryId) ?? [];
        const sum = incomesByCategory.reduce((acc, curr) => acc + curr.amount.amount, 0);
        map.set(income.categoryId, { amount: sum, currency: income.amount.currency });
      });
      return map;
    },
  },
});
