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
    categoriesMapById: (state: ExpenseCategoriesModel): Map<string, ExpenseCategory> => {
      const map = new Map<string, ExpenseCategory>();

      if (!state.categories.data) return map;

      state.categories.data.forEach(category => {
        map.set(category.id, category);
      });
      return map;
    },
  },
});
