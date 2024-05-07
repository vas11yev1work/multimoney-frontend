import { simpleFaker, fakerRU as faker } from '@faker-js/faker';
import { ExpenseCategory } from '@/shared/api';
import { capitalize } from '@/shared/lib';
import { Icons } from '@/shared/ui/expense-icon-select/icons.ts';

const createExpenseCategory = (): ExpenseCategory => {
  return {
    id: simpleFaker.string.uuid(),
    name: capitalize(faker.commerce.department()),
    icon: faker.helpers.arrayElement(Icons),
    limit: faker.helpers.maybe(() => ({
      amount: faker.number.int({ min: 100, max: 1000 }),
      currency: 'EUR',
    })),
  };
};

export const createExpenseCategoriesMock = (): ExpenseCategory[] => {
  return faker.helpers.multiple(createExpenseCategory, { count: faker.number.int({ min: 4, max: 8 }) });
};
