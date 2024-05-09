import { api } from '../../api';
import { IncomeCategory } from './income-categories.types';

export class IncomeCategoriesApi {
  static getCategories() {
    return api().get<IncomeCategory[]>('income-categories');
  }
}
