import { createAppSettingsMock } from './app-settings.mock';
import { createBalanceStateMock } from './balance-state.mock';
import { createCardsMock } from './cards.mock';
import { createExpenseCategoriesMock } from './expense-categories.mock';
import { createExpensesMock } from './expenses.mock';
import { createIncomeCategoriesMock } from './income-categories.mock';

const createMock = () => {
  const appSettings = createAppSettingsMock();
  const balanceState = createBalanceStateMock();
  const cards = createCardsMock(balanceState.total.EUR?.amount ?? 0);
  const expenseCategories = createExpenseCategoriesMock();
  const incomeCategories = createIncomeCategoriesMock();
  const expenses = createExpensesMock(balanceState.expenses.EUR?.amount ?? 0, cards, expenseCategories);

  return {
    appSettings,
    balanceState,
    cards,
    expenseCategories,
    incomeCategories,
    expenses,
  };
};

export const mockData = createMock();
