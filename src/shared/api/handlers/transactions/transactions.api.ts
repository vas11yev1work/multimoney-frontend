import { api } from '../../api';
import { Transaction } from './transactions.types';

export class TransactionsApi {
  static getTransactions() {
    return api().get<Transaction[]>('transactions');
  }
}
