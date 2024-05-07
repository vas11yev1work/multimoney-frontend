import { delay, http, HttpResponse } from 'msw';
import { mockData } from '../mocks';

export const appSettingsHandler = {
  success: http.get('*/api/v1/app-settings', async () => {
    await delay();
    return HttpResponse.json(mockData.appSettings);
  }),
};
