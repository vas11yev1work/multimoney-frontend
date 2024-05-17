import { Transaction, TransactionExpense, TransactionIncome, TransactionTransfer, TransactionType } from '@/shared/api';

export const isExpense = (transaction: Transaction): transaction is TransactionExpense => {
  return transaction.type === TransactionType.Expense;
};

export const isIncome = (transaction: Transaction): transaction is TransactionIncome => {
  return transaction.type === TransactionType.Income;
};

export const isTransfer = (transaction: Transaction): transaction is TransactionTransfer => {
  return transaction.type === TransactionType.Transfer;
};
