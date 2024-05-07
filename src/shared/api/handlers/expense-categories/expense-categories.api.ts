import { api } from '../../api';
import { ExpenseCategory } from './expense-categories.types';

export class ExpenseCategoriesApi {
  static getCategories() {
    return api().get<ExpenseCategory[]>('expense-categories');
  }
}
