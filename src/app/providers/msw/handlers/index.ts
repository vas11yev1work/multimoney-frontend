import { appSettingsHandler } from './app-settings.handler';
import { balanceStateHandler } from './balance-state.handler';
import { cardsHandler } from './cards.handler';
import { expenseCategoriesHandler } from './expense-categories.handler';
import { expensesHandler } from './expenses.handler';

export const handlers = [
  balanceStateHandler.success,
  appSettingsHandler.success,
  cardsHandler.success,
  expenseCategoriesHandler.success,
  expensesHandler.success,
];
