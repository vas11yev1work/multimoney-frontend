import { api } from '../../api.ts';
import { Expense } from './expenses.types';

export class ExpensesApi {
  static getExpenses() {
    return api().get<Expense[]>('expenses');
  }
}
