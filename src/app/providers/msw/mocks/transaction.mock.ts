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
  TransactionTransfer,
  TransactionType,
} from '@/shared/api';
import { divideRandomly } from '@/shared/lib';

const EXPENSE_COUNT = 15;
const INCOME_COUNT = 4;
const TRANSFER_COUNT = 2;

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

const createTransfer = (amount: number, cardFrom: Card, cardTo: Card): TransactionTransfer => {
  return {
    id: simpleFaker.string.uuid(),
    type: TransactionType.Transfer,
    amount: {
      amount,
      currency: 'EUR',
    },
    currencyAmount: {
      amount: amount * quotes[cardFrom.currencyBalance.currency],
      currency: cardFrom.currencyBalance.currency,
    },
    toAmount: {
      amount,
      currency: 'EUR',
    },
    toCurrencyAmount: {
      amount: amount * quotes[cardTo.currencyBalance.currency],
      currency: cardTo.currencyBalance.currency,
    },
    date: faker.date.between({ from: dayjs().startOf('month').format(), to: dayjs().format() }).toISOString(),
    cardId: cardFrom.id,
    toCardId: cardTo.id,
    description: faker.helpers.maybe(() => faker.finance.transactionDescription()),
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

const createTransfersMock = (cards: Card[]): TransactionTransfer[] => {
  const dividedEur = divideRandomly(faker.number.int({ min: 300, max: 1000 }), TRANSFER_COUNT);

  return new Array(TRANSFER_COUNT).fill(0).map(() => {
    const cardFrom = faker.helpers.arrayElement(cards);
    const cardTo = faker.helpers.arrayElement(cards.filter(card => card.id !== cardFrom.id));
    return createTransfer(dividedEur[0], cardFrom, cardTo);
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
  const transfers = createTransfersMock(cards);

  return [...expenses, ...incomes, ...transfers].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
};
