import { appSettingsHandler } from './app-settings.handler';
import { balanceStateHandler } from './balance-state.handler';
import { cardsHandler } from './cards.handler';
import { expenseCategoriesHandler } from './expense-categories.handler';
import { incomeCategoriesHandler } from './income-categories.handler';
import { transactionsHandler } from './transaction.handler';

export const handlers = [
  balanceStateHandler.success,
  appSettingsHandler.success,
  cardsHandler.success,
  expenseCategoriesHandler.success,
  incomeCategoriesHandler.success,
  transactionsHandler.success,
];
