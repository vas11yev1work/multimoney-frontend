import { faker } from '@faker-js/faker';
import { quotes } from '@/shared';
import { BalanceState } from '@/shared/api';

export const createBalanceStateMock = (): BalanceState => {
  const totalEUR = faker.number.float({ min: 5000, max: 10000, fractionDigits: 2 });
  const incomesEUR = faker.number.float({ min: 3000, max: 5000, fractionDigits: 2 });
  const expensesEUR = faker.number.float({ min: 100, max: 3000, fractionDigits: 2 });

  return {
    total: {
      EUR: { amount: totalEUR, currency: 'EUR' },
      USD: { amount: totalEUR * quotes.USD, currency: 'USD' },
      RUB: { amount: totalEUR * quotes.RUB, currency: 'RUB' },
      KZT: { amount: totalEUR * quotes.KZT, currency: 'RUB' },
    },
    incomes: {
      EUR: { amount: incomesEUR, currency: 'EUR' },
      USD: { amount: incomesEUR * quotes.USD, currency: 'USD' },
      RUB: { amount: incomesEUR * quotes.RUB, currency: 'RUB' },
      KZT: { amount: incomesEUR * quotes.KZT, currency: 'RUB' },
    },
    expenses: {
      EUR: { amount: expensesEUR, currency: 'EUR' },
      USD: { amount: expensesEUR * quotes.USD, currency: 'USD' },
      RUB: { amount: expensesEUR * quotes.RUB, currency: 'RUB' },
      KZT: { amount: expensesEUR * quotes.KZT, currency: 'RUB' },
    },
  };
};
