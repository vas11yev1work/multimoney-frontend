import { simpleFaker, fakerRU as faker } from '@faker-js/faker';
import { ExpenseCategory } from '@/shared/api';
import { capitalize } from '@/shared/lib';
import { IncomeIcons } from '@/shared/ui';

const createIncomeCategory = (): ExpenseCategory => {
  return {
    id: simpleFaker.string.uuid(),
    name: capitalize(faker.commerce.department()),
    icon: faker.helpers.arrayElement(IncomeIcons),
  };
};

export const createIncomeCategoriesMock = (): ExpenseCategory[] => {
  return faker.helpers.multiple(createIncomeCategory, { count: 3 });
};
