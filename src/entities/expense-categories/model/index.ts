import { defineStore } from 'pinia';
import { ExpenseCategoriesApi, ExpenseCategory, getDefaultSharedState, loadSharedData, SharedData } from '@/shared/api';

interface ExpenseCategoriesModel {
  categories: SharedData<ExpenseCategory[]>;
}

export const useExpenseCategoriesModel = defineStore({
  id: 'expense-categories',
  state: (): ExpenseCategoriesModel => ({
    categories: getDefaultSharedState(),
  }),
  actions: {
    async loadCategories() {
      await loadSharedData({
        promise: () => ExpenseCategoriesApi.getCategories(),
        currentData: this.categories,
      });
    },
  },
  getters: {
    getCategoryById: (state: ExpenseCategoriesModel) => (id: string) => {
      if (!state.categories.data) return null;
      return state.categories.data.find(category => category.id === id) ?? null;
    },
  },
});
