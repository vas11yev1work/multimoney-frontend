import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const expenseCategoriesHandler = {
  success: http.get('*/api/v1/expense-categories', async () => {
    await delay();
    return HttpResponse.json(mockData.expenseCategories);
  }),
};
