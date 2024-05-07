import { simpleFaker, fakerRU as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Card, Expense, ExpenseCategory } from '@/shared/api';
import { KZT, RUB, USD } from '@/shared/const/quotes.ts';
import { Currency, divideRandomly } from '@/shared/lib';

const EXPENSE_COUNT = 15;

const createExpense = (amount: number, card: Card, categoryId: string): Expense => {
  const quotes = {
    KZT,
    RUB,
    USD,
    EUR: 1,
  } as Record<Currency, number>;

  return {
    id: simpleFaker.string.uuid(),
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

export const createExpensesMock = (totalEur: number, cards: Card[], categories: ExpenseCategory[]): Expense[] => {
  const dividedEur = divideRandomly(totalEur, EXPENSE_COUNT);

  return new Array(EXPENSE_COUNT).fill(0).map((_, index) => {
    const card = faker.helpers.arrayElement(cards);
    const categoryId = faker.helpers.arrayElement(categories).id;
    return createExpense(dividedEur[index], card, categoryId);
  });
};
