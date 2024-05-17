import { simpleFaker, fakerRU as faker } from '@faker-js/faker';
import { quotes } from '@/shared';
import { Card, CardColor } from '@/shared/api';
import { Currency, divideRandomly } from '@/shared/lib';

const CARD_COUNT = 3;

const createCard = (amount: number): Card => {
  const cardCurrency = faker.helpers.arrayElement(['USD', 'EUR', 'RUB', 'KZT']) as Currency;

  return {
    id: simpleFaker.string.uuid(),
    color: faker.helpers.arrayElement(Object.values(CardColor)),
    name: faker.finance.accountName(),
    label: faker.helpers.maybe(() => `** ${faker.number.int({ min: 1000, max: 9999 })}`),
    balance: {
      amount: amount,
      currency: 'EUR',
    },
    currencyBalance: {
      amount: amount * quotes[cardCurrency],
      currency: cardCurrency,
    },
  };
};

export const createCardsMock = (totalEur: number): Card[] => {
  const dividedEur = divideRandomly(totalEur, CARD_COUNT);

  return new Array(CARD_COUNT).fill(0).map((_, index) => createCard(dividedEur[index]));
};
