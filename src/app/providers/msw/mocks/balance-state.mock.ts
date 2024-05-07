import { faker } from '@faker-js/faker';
import { BalanceState } from '@/shared/api';
import { KZT, RUB, USD } from '@/shared/const/quotes.ts';

export const createBalanceStateMock = (): BalanceState => {
  const totalEUR = faker.number.float({ min: 5000, max: 10000, fractionDigits: 2 });
  const incomesEUR = faker.number.float({ min: 3000, max: 5000, fractionDigits: 2 });
  const expensesEUR = faker.number.float({ min: 100, max: 3000, fractionDigits: 2 });

  return {
    total: {
      EUR: { amount: totalEUR, currency: 'EUR' },
      USD: { amount: totalEUR * USD, currency: 'USD' },
      RUB: { amount: totalEUR * RUB, currency: 'RUB' },
      KZT: { amount: totalEUR * KZT, currency: 'RUB' },
    },
    incomes: {
      EUR: { amount: incomesEUR, currency: 'EUR' },
      USD: { amount: incomesEUR * USD, currency: 'USD' },
      RUB: { amount: incomesEUR * RUB, currency: 'RUB' },
      KZT: { amount: incomesEUR * KZT, currency: 'RUB' },
    },
    expenses: {
      EUR: { amount: expensesEUR, currency: 'EUR' },
      USD: { amount: expensesEUR * USD, currency: 'USD' },
      RUB: { amount: expensesEUR * RUB, currency: 'RUB' },
      KZT: { amount: expensesEUR * KZT, currency: 'RUB' },
    },
  };
};
