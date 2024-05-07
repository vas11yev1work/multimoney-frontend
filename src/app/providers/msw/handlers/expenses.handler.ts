import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const expensesHandler = {
  success: http.get('*/api/v1/expenses', async () => {
    await delay();
    return HttpResponse.json(mockData.expenses);
  }),
};
