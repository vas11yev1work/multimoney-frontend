import { defineStore } from 'pinia';
import { ExpenseCategory, getDefaultSharedState, SharedData } from '@/shared/api';

interface ExpenseCategoryModel {
  categories: SharedData<ExpenseCategory[]>;
}

export const useExpenseCategoryModel = defineStore({
  id: 'expense-category',
  state: (): ExpenseCategoryModel => ({
    categories: getDefaultSharedState<ExpenseCategory[]>({
      data: [
        {
          id: '1',
          name: 'Продукты',
          icon: 'faUtensils',
        },
        {
          id: '2',
          name: 'Английский язык',
          icon: 'faGlobe',
        },
        {
          id: '3',
          name: 'Такси',
          icon: 'faTaxi',
          limit: {
            amount: 200,
            currency: 'EUR',
          },
        },
      ],
    }),
  }),
  getters: {
    getCategoryById: (state: ExpenseCategoryModel) => (id: string) => {
      if (!state.categories.data) return null;
      return state.categories.data.find(category => category.id === id) ?? null;
    },
  },
});
