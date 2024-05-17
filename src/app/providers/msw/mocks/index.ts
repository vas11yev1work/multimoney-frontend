import { createAppSettingsMock } from './app-settings.mock';
import { createBalanceStateMock } from './balance-state.mock';
import { createCardsMock } from './cards.mock';
import { createExpenseCategoriesMock } from './expense-categories.mock';
import { createIncomeCategoriesMock } from './income-categories.mock';
import { createTransactionsMock } from './transaction.mock';

const createMock = () => {
  const appSettings = createAppSettingsMock();
  const balanceState = createBalanceStateMock();
  const cards = createCardsMock(balanceState.total.EUR?.amount ?? 0);
  const expenseCategories = createExpenseCategoriesMock();
  const incomeCategories = createIncomeCategoriesMock();
  const transactions = createTransactionsMock(balanceState, cards, expenseCategories, incomeCategories);

  return {
    appSettings,
    balanceState,
    cards,
    expenseCategories,
    incomeCategories,
    transactions,
  };
};

export const mockData = createMock();
