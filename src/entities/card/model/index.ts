import { defineStore } from 'pinia';
import { getDefaultSharedState, SharedData, CardColor, Card } from '@/shared/api';

interface CardModel {
  cards: SharedData<Card[]>;
}

export const useCardModel = defineStore({
  id: 'card',
  state: (): CardModel => ({
    cards: getDefaultSharedState<Card[]>({
      data: [
        {
          id: '123',
          color: CardColor.Slate,
          name: 'Slate Card',
          label: '** 2838',
          balance: {
            amount: 232.31,
            currency: 'EUR',
          },
          currencyBalance: {
            amount: 113432.72,
            currency: 'KZT',
          },
        },
        {
          id: '456',
          color: CardColor.Red,
          name: 'Slate Card',
          label: '** 3315',
          balance: {
            amount: 405.56,
            currency: 'EUR',
          },
          currencyBalance: {
            amount: 40142.09,
            currency: 'RUB',
          },
        },
        {
          id: '789',
          color: CardColor.Amber,
          name: 'Slate Card',
          label: '** 3315',
          balance: {
            amount: 399.31,
            currency: 'EUR',
          },
          currencyBalance: {
            amount: 399.31,
            currency: 'EUR',
          },
        },
      ],
    }),
  }),
});
