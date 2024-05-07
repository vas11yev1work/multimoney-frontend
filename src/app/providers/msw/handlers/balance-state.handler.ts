import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const balanceStateHandler = {
  success: http.get('*/api/v1/balance-state', async () => {
    await delay();
    return HttpResponse.json(mockData.balanceState);
  }),
};
