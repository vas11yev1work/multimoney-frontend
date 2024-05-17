import { AmountModel } from '@/shared/lib';

interface BaseTransaction {
  id: string;
  date: string;
  description?: string;
  amount: AmountModel;
  currencyAmount: AmountModel;
  cardId: string;
  type: TransactionType;
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer',
}

export interface TransactionExpense extends BaseTransaction {
  type: TransactionType.Expense;
  categoryId: string;
}

export interface TransactionIncome extends BaseTransaction {
  type: TransactionType.Income;
  categoryId: string;
}

export interface TransactionTransfer extends BaseTransaction {
  type: TransactionType.Transfer;
  toAmount: AmountModel;
  toCurrencyAmount: AmountModel;
  toCardId: string;
}

export type Transaction = TransactionExpense | TransactionIncome | TransactionTransfer;
