import { defineStore } from 'pinia';
import { getDefaultSharedState, SharedData, Card, loadSharedData, CardsApi } from '@/shared/api';

interface CardsModel {
  cards: SharedData<Card[]>;
}

export const useCardsModel = defineStore({
  id: 'card',
  state: (): CardsModel => ({
    cards: getDefaultSharedState(),
  }),
  actions: {
    async loadCards() {
      await loadSharedData({
        promise: () => CardsApi.getCards(),
        currentData: this.cards,
      });
    },
  },
});
