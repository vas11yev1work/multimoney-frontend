import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const transactionsHandler = {
  success: http.get('*/api/v1/transactions', async () => {
    await delay();
    return HttpResponse.json(mockData.transactions);
  }),
};
