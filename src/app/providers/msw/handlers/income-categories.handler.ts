import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const incomeCategoriesHandler = {
  success: http.get('*/api/v1/income-categories', async () => {
    await delay();
    return HttpResponse.json(mockData.incomeCategories);
  }),
};
