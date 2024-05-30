import { fakerRU as faker, simpleFaker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { quotes } from '@/shared';
import {
  BalanceState,
  Card,
  ExpenseCategory,
  IncomeCategory,
  TransactionExpense,
  TransactionIncome,
  TransactionType,
} from '@/shared/api';
import { divideRandomly } from '@/shared/lib';

const EXPENSE_COUNT = 15;
const INCOME_COUNT = 4;

const createExpense = (amount: number, card: Card, categoryId: string): TransactionExpense => {
  return {
    id: simpleFaker.string.uuid(),
    type: TransactionType.Expense,
    amount: {
      amount,
      currency: 'EUR',
    },
    currencyAmount: {
      amount: amount * quotes[card.currencyBalance.currency],
      currency: card.currencyBalance.currency,
    },
    description: faker.helpers.maybe(() => faker.finance.transactionDescription()),
    date: faker.date.between({ from: dayjs().startOf('month').format(), to: dayjs().format() }).toISOString(),
    cardId: card.id,
    categoryId,
  };
};

const createIncome = (amount: number, card: Card, categoryId: string): TransactionIncome => {
  return {
    id: simpleFaker.string.uuid(),
    type: TransactionType.Income,
    amount: {
      amount,
      currency: 'EUR',
    },
    currencyAmount: {
      amount: amount * quotes[card.currencyBalance.currency],
      currency: card.currencyBalance.currency,
    },
    description: faker.helpers.maybe(() => faker.finance.transactionDescription()),
    date: faker.date.between({ from: dayjs().startOf('month').format(), to: dayjs().format() }).toISOString(),
    cardId: card.id,
    categoryId,
  };
};

const createExpensesMock = (totalEur: number, cards: Card[], categories: ExpenseCategory[]): TransactionExpense[] => {
  const dividedEur = divideRandomly(totalEur, EXPENSE_COUNT);

  return new Array(EXPENSE_COUNT).fill(0).map((_, index) => {
    const card = faker.helpers.arrayElement(cards);
    const categoryId = faker.helpers.arrayElement(categories).id;
    return createExpense(dividedEur[index], card, categoryId);
  });
};

const createIncomesMock = (totalEur: number, cards: Card[], categories: IncomeCategory[]): TransactionIncome[] => {
  const dividedEur = divideRandomly(totalEur, INCOME_COUNT);

  return new Array(INCOME_COUNT).fill(0).map((_, index) => {
    const card = faker.helpers.arrayElement(cards);
    const categoryId = faker.helpers.arrayElement(categories).id;
    return createIncome(dividedEur[index], card, categoryId);
  });
};

export const createTransactionsMock = (
  balanceState: BalanceState,
  cards: Card[],
  expenseCategories: ExpenseCategory[],
  incomeCategories: IncomeCategory[]
) => {
  const totalIncomes = balanceState.incomes.EUR?.amount ?? 0;
  const totalExpenses = balanceState.expenses.EUR?.amount ?? 0;
  const incomes = createIncomesMock(totalIncomes, cards, incomeCategories);
  const expenses = createExpensesMock(totalExpenses, cards, expenseCategories);

  return [...expenses, ...incomes].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
};
