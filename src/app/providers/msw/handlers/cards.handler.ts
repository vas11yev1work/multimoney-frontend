import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const cardsHandler = {
  success: http.get('*/api/v1/cards', async () => {
    await delay();
    return HttpResponse.json(mockData.cards);
  }),
};
