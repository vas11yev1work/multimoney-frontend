import { defineStore } from 'pinia';
import { getDefaultSharedState, IncomeCategoriesApi, IncomeCategory, loadSharedData, SharedData } from '@/shared/api';

interface IncomeCategoriesModel {
  categories: SharedData<IncomeCategory[]>;
}

export const useIncomeCategoriesModel = defineStore({
  id: 'income-categories',
  state: (): IncomeCategoriesModel => ({
    categories: getDefaultSharedState(),
  }),
  actions: {
    async loadCategories() {
      await loadSharedData({
        promise: () => IncomeCategoriesApi.getCategories(),
        currentData: this.categories,
      });
    },
  },
  getters: {
    categoriesMapById: (state: IncomeCategoriesModel): Map<string, IncomeCategory> => {
      const map = new Map<string, IncomeCategory>();

      if (!state.categories.data) return map;

      state.categories.data.forEach(category => {
        map.set(category.id, category);
      });
      return map;
    },
  },
});
